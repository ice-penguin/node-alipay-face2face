var private_key = "";
var app_id = "";
var alipay=require('../index').initClient({
	private_key:private_key,//您的应用私钥文件，或者私钥字符串，必填
	app_id:app_id//支付宝应用号，必填
});

/**
 * 发起条码支付
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} notify_url [通知地址]
 * @param {[String]} app_auth_token [应用授权]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//商户订单号,64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
		"scene ",//条码支付，取值：bar_code 声波支付，取值：wave_code
		"subject"//	订单标题
		"auth_code"//支付授权码，25~30开头的长度为16~24位的数字，实际字符串长度以开发者获取的付款码长度为准
		"total_amount"//订单总金额，单位为元，精确到小数点后两位
	}
 */
var pay = function(){
	alipay.pay({
		biz_content:{
			out_trade_no:"10010",
			scene:"bar_code",
			auth_code:"286526299255235346",
			subject:"测试标题",
			total_amount:0.01			
		}
	})
	.then(function(body){
		console.log(body);
	})
}

/**
 * 手机网站h5支付
 * @author penguinhj
 * @DateTime 2019-09-03T10:12:39+0800
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} return_url [支付成功后跳转地址]
 * @param {[String]} notify_url [通知地址]
 * @param {[String]} app_auth_token [应用授权]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//商户订单号,64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
		"subject"//	订单标题
		"total_amount"//订单总金额，单位为元，精确到小数点后两位
	}
 */
var payH5 = function(){
	alipay.payH5({
		return_url:"http://www.baidu.com",
		biz_content:{
			out_trade_no:"10013",
			subject:"测试标题",
			total_amount:0.01
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

/**
 * 统一收单线下交易预创建
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} notify_url [通知地址]
 * @param  {[String]} app_auth_token [应用授权地址]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//商户订单号,64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
		"subject"//	订单标题
		"total_amount"//订单总金额，单位为元，精确到小数点后两位
	}
 */
var precreate = function(){
	alipay.precreate({
		biz_content:{
			out_trade_no:"10012",
			subject:"测试标题",
			total_amount:0.01
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

/**
 * app支付接口
 * @author penguinhj
 * @DateTime 2019-09-03T10:12:39+0800
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} return_url [支付成功后跳转地址]
 * @param {[String]} notify_url [通知地址]
 * @param {[String]} app_auth_token [应用授权]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//商户订单号,64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
		"subject"//	订单标题
		"total_amount"//订单总金额，单位为元，精确到小数点后两位
	}
 */
var appPay = function(){
	alipay.appPay({
		biz_content:{
			out_trade_no:"xxxx",
			subject:"测试标题",
			total_amount:0.01,
			body:"描述",
			goods_detail:[{
				goods_id:"apple-01",
				goods_name:"ipad",
				quantity:1,
				price:2000
			}]
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

/**
 * 统一收单线下交易查询
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} app_auth_token [应用授权]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
		"trade_no"//支付宝交易号，和商户订单号不能同时为空
	}
 */
var query = function(){
	alipay.query({
		biz_content:{
			out_trade_no:"10010"
		}
	})
	.then(function(body){
		console.log(body);
	})
}

/**
 * 统一收单交易撤销接口
 * @param  {[String]} biz_content [请求参数的集合]
 * @param {[String]} app_auth_token [应用授权]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
		"trade_no"//支付宝交易号，和商户订单号不能同时为空
	}
 */
var cancel = function(){
	alipay.cancel({
		biz_content:{
			out_trade_no:"10012"
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

/**
 * 统一收单交易退款接口
 * @param  {[String]} biz_content [请求参数的集合]
 * @param  {[String]} app_auth_token [应用授权地址]
 * biz_content常用参数,其它参数详见支付宝文档
 * biz_content:{
		"out_trade_no",//订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
		"trade_no"//支付宝交易号，和商户订单号不能同时为空
		"refund_amount"//需要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数
	}
 */
var refund = function(){
	alipay.refund({
		biz_content:{
			out_trade_no:"10013",
			refund_amount:0.01
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

// pay();//10010
// payH5();//10013
// precreate()//10012
// query();
// cancel();
// refund();
