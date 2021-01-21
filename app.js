const express = require('express');
const app = express();
const path = require('path');

 let router = require('./router/router')

// var mysql = require('mysql'); 

// //连接数据库参数配置
// var connection = mysql.createConnection({
//     host    :"localhost", //主机
//     port    :'3306',	//端口
//     user    :"root",	//用户名
//     password:"root",	//密码
//     database:"artcile2021"		//数据库
// });

// //连接mysql
// connection.connect(function(err){
//     if(err){
//         throw err;
//     }
//     console.log('connect mysql success');
// });

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//配置模板的路径
app.set('views', __dirname + '/views/');

//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 

//使用模板引擎扩展名为html
app.set('view engine', 'html');

// 中间件托管静态资源

app.use('/public',express.static(path.join(__dirname,'public')))


app.use(router)
app.listen(4200,()=>{
   console.log('server is running at port 4200');
})