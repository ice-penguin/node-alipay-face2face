'use strict';

var crypto = require("crypto");
var fs = require("fs");
var request = require('request');
var qs = require('querystring');
var util = require('./util');
// var private_key = fs.readFileSync(__dirname+'/../../tool/rsa_private_key.pem');//应用RSA私钥
var private_key;
var baseUrl = "https://openapi.alipay.com/gateway.do";
var api_method = {
	pay:"alipay.trade.pay",//统一收单交易支付接口（条码支付）
	query:"alipay.trade.query",//统一收单线下交易查询
	cancel:"alipay.trade.cancel",//统一收单交易撤销接口
	refund:"alipay.trade.refund",//统一收单交易退款接口
	precreate:"alipay.trade.precreate"//统一收单线下交易预创建
};
var app_id;//应用id
var notify_url;//支付宝通知网关

//所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
function sortKey(info){
	var str = "";
	var keyArr = [];
	for (var key in info) {
		if(info[key]==""||!info[key]){
			continue;
		}
		keyArr.push(key);
	}
	keyArr.sort();
	for (var i = 0; i < keyArr.length; i++) {
		if(i>0){
			str += "&";
		}
		str += (keyArr[i]+"="+info[keyArr[i]])
	}
	// console.log("params:"+str);
	return  str;
};

//验签
function veriySign(params) {
	try {
	     //读取秘钥
	     var privatePem = private_key;
	     var key = privatePem.toString();
	     var prestr = sortKey(params)
	     var sign = crypto.createSign('RSA-SHA1');
	     sign.update(prestr);
	     sign = sign.sign(key, 'base64');
	     // console.log("key:"+key);
	     // console.log("sign:"+sign);
	     return encodeURIComponent(sign)
	 } catch(err) {
	     console.log('err', err)
	 }
}

//获取请求所需的时间戳字符串
function getTimestampStr(){
	var now = new Date();
	var year = now.getFullYear(),
		month = now.getMonth()+1,
		date = now.getDate(),
		hours = now.getHours(),
		mins = now.getMinutes(),
		seconds = now.getSeconds();
	//初始化date,month,hours,mins,seconds位数
	month = month>9?month:("0"+month);
	date = date>9?date:("0"+date);
	hours = hours>9?hours:("0"+hours);
	mins = mins>9?mins:("0"+mins);
	seconds = seconds>9?seconds:("0"+seconds);
	return year+"-"+month+"-"+date+" "+hours+":"+mins+":"+seconds;
}

/**
 * 发起条码支付
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} notify_url [通知地址]
 * @param {[String]} app_auth_token [应用授权]
 */
var pay = function(params){
	var url = baseUrl;
	var body = {
		app_id:app_id,
		method:api_method.pay,
		charset:"utf-8",
		sign_type:"RSA",
		timestamp:getTimestampStr(),
		version:"1.0",
		notify_url:params.notify_url?params.notify_url:notify_url,
		app_auth_token:params.app_auth_token?params.app_auth_token:undefined,
		biz_content:params.biz_content
	};

	body.biz_content = JSON.stringify(body.biz_content);

	//对路由编码，主要对中文编码，不然验签会失败
	url = url+"?"+qs.stringify(body);

	// console.log(veriySign(body));
	body.sign = veriySign(body);

	//拼接签名
	url = url+"&sign="+body.sign;

	return new Promise(function(resolve,reject){
		request.post({url:url,json:true},function(error, response, body){
			if(error){
				return reject(error);
			}
			resolve(body);
		});
	})
	
}

/**
 * 统一收单线下交易查询
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} app_auth_token [应用授权]
 */
var query = function(params){
	var url = baseUrl;
	var body = {
		app_id:app_id,
		method:api_method.query,
		charset:"utf-8",
		sign_type:"RSA",
		timestamp:getTimestampStr(),
		version:"1.0",
		app_auth_token:params.app_auth_token?params.app_auth_token:undefined,
		biz_content:params.biz_content
	};

	body.biz_content = JSON.stringify(body.biz_content);

	//对路由编码，主要对中文编码，不然验签会失败
	url = url+"?"+qs.stringify(body);

	// console.log(veriySign(body));
	body.sign = veriySign(body);

	//拼接签名
	url = url+"&sign="+body.sign;

	return new Promise(function(resolve,reject){
		request.post({url:url,json:true},function(error, response, body){
			if(error){
				return reject(error);
			}
			console.log(body);
			resolve(body);
		});
	})
	
}

/**
 * 统一收单交易撤销接口
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} app_auth_token [应用授权]
 */
var cancel = function(params){
	var url = baseUrl;
	var body = {
		app_id:app_id,
		method:api_method.cancel,
		charset:"utf-8",
		sign_type:"RSA",
		timestamp:getTimestampStr(),
		version:"1.0",
		app_auth_token:params.app_auth_token?params.app_auth_token:undefined,
		biz_content:params.biz_content
	};

	body.biz_content = JSON.stringify(body.biz_content);

	//对路由编码，主要对中文编码，不然验签会失败
	url = url+"?"+qs.stringify(body);

	// console.log(veriySign(body));
	body.sign = veriySign(body);

	//拼接签名
	url = url+"&sign="+body.sign;

	return new Promise(function(resolve,reject){
		request.post({url:url,json:true},function(error, response, body){
			if(error){
				return reject(error);
			}
			resolve(body);
		});
	})
	
}

/**
 * 统一收单交易退款接口
 * @param  {[String]} biz_content [请求参数的集合]
 * @param  {[String]} app_auth_token [应用授权地址]
 */
var refund = function(params){
	var url = baseUrl;
	var body = {
		app_id:app_id,
		method:api_method.refund,
		charset:"utf-8",
		sign_type:"RSA",
		timestamp:getTimestampStr(),
		version:"1.0",
		app_auth_token:params.app_auth_token?params.app_auth_token:undefined,
		biz_content:params.biz_content
	};

	body.biz_content = JSON.stringify(body.biz_content);

	//对路由编码，主要对中文编码，不然验签会失败
	url = url+"?"+qs.stringify(body);

	// console.log(veriySign(body));
	body.sign = veriySign(body);

	//拼接签名
	url = url+"&sign="+body.sign;

	return new Promise(function(resolve,reject){
		request.post({url:url,json:true},function(error, response, body){
			if(error){
				return reject(error);
			}
			resolve(body);
		});
	})
	
}

/**
 * 统一收单线下交易预创建
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} notify_url [通知地址]
 * @param  {[String]} app_auth_token [应用授权地址]
 */
var precreate = function(params){
	var url = baseUrl;
	var body = {
		app_id:app_id,
		method:api_method.precreate,
		charset:"utf-8",
		sign_type:"RSA",
		timestamp:getTimestampStr(),
		version:"1.0",
		notify_url:params.notify_url?params.notify_url:notify_url,
		app_auth_token:params.app_auth_token?params.app_auth_token:undefined,
		biz_content:params.biz_content
	};

	body.biz_content = JSON.stringify(body.biz_content);

	//对路由编码，主要对中文编码，不然验签会失败
	url = url+"?"+qs.stringify(body);

	// console.log(veriySign(body));
	body.sign = veriySign(body);

	//拼接签名
	url = url+"&sign="+body.sign;

	return new Promise(function(resolve,reject){
		request.post({url:url,json:true},function(error, response, body){
			if(error){
				return reject(error);
			}
			resolve(body);
		});
	})
	
}

// exports.alipay_pay = pay;//发起条码支付
// exports.alipay_query = query;//统一收单线下交易查询
// exports.alipay_cancel = cancel;//统一收单交易撤销接口

/**
 * 初始化阿里支付客户端
 * @param  {[file]} private_key [加密私钥文件]
 * @param {[app_id]} app_id [应用id]
 */
exports.initClient = function (params){
	if(!params){
		console.log("can't found params. 缺少初始化参数");
		return ;
	}
	if(!params.private_key){
		console.log("can't found private_key. 缺少加密私钥文件");
		return ;
	}
	if(!params.app_id){
		console.log("can't found app_id. 缺少应用id");
		return ;
	}
	try{
		private_key = fs.readFileSync(params.private_key);
	}catch (err){
		console.log(err);
		return;
	}
	app_id = params.app_id;
	if(params.notify_url){
		notify_url = params.notify_url;
	}
	return {
		getTimestampStr:getTimestampStr,
		pay:pay,
		query:query,
		cancel:cancel,
		refund:refund,
		precreate:precreate
	};
};