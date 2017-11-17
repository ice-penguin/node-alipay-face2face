//保留两位小数
//str是否返回字符串
exports.dealNumber=function(num,str){
  if(!num && num != 0){
  	return;
  }
  var num2=num.toFixed(3);
  if(str){
    return num2.substring(0,num2.lastIndexOf('.')+3);
  }else{
    return  parseFloat(num2.substring(0,num2.lastIndexOf('.')+3));
  }
};