## Install 安装


>use npm isntall
>
>使用npm安装 

	npm install node-alipay-f2f-sdk

>[download](https://github.com/ice-penguin/node_alipay_face2face/) from github
>
>从github[下载](https://github.com/ice-penguin/node_alipay_face2face/)

## Introduce 模块说明 

>该模块目前仅支持支付宝RSA加密方式，支持面对面支付大部分接口，biz_content参数同支付宝，见[支付宝文档](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.XVhLo4&treeId=193&articleId=105203&docType=1)，公共请求参数只需设置notify_url，app_auth_token，也可不进行设置，请求结果返回promise对象

## Set RSA(SHA1) public key 加密公钥设置
>进入应用页面设置接口加签方式，使用其他加签方式，上传公钥证书，或者复制年黏贴公钥证书（复制黏贴注意去掉多余空格）

## Sample example  使用说明 

### init Client 初始化支付宝客户端

	var alipay=require('node-alipay-f2f-sdk').initClient({
		private_key:__dirname+"/rsa_private_key.pem",//您的应用私钥文件，必填
		app_id:"xxxx",//支付宝应用号，必填
		notify_url:"xxx"//支付宝通知地址，若具体请求中不填写，默认使用此地址
	});

### Pay(bar_code,wave_code ) 统一收单交易支付接口（条码支付）
	
	alipay.pay({
		notify_url："xxx",//若填写此参数，以此参数为准，初始化的参数不生效
		app_auth_token："xx",
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

### Query 统一收单线下交易查询

	alipay.query({
		biz_content:{
			out_trade_no:"xxx"
		}
	})
	.then(function(body){
		console.log(body);
	})

### Cancel 统一收单交易撤销接口

	alipay.cancel({
		biz_content:{
			out_trade_no:"xxxx"
		}
	})
	.then(function(body){
		console.log(body);
	})

### Refund 统一收单交易退款接口

	alipay.refund({
		biz_content:{
			out_trade_no:"xxxx",
			refund_amount:0.01
		}
	})
	.then(function(body){
		console.log(body);
	})

### Code_pay 统一收单线下交易预创建（扫码支付）

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