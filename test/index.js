var alipay=require('../index').initClient({
	private_key:__dirname+"/rsa_private_key.pem",//您的应用私钥文件，必填
	app_id:"xxxx",//支付宝应用号，必填
	notify_url:"xxx"//支付宝通知地址，若具体请求中不填写，默认使用此地址
});

var pay = function(){
	alipay.pay({
		biz_content:{
			out_trade_no:"xxxx",
			scene:"bar_code",
			auth_code:"xxxx",
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

var query = function(){
	alipay.query({
		biz_content:{
			out_trade_no:"xxx"
		}
	})
	.then(function(body){
		console.log(body);
	})
}

var cancel = function(){
	alipay.cancel({
		biz_content:{
			out_trade_no:"xxxx"
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

var refund = function(){
	alipay.cancel({
		biz_content:{
			out_trade_no:"xxxx",
			refund_amount:0.01
		}
	})
	.then(function(body){
		console.log(body);
	})
	
}

var precreate = function(){
	alipay.precreate({
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

// precreate();
