const express = require('express');
const path = require('path');
const app = express();

let session = require('express-session');
// 设置跨域
let cors = require('cors')
app.use(cors())

// 导入路由模块
const apiRouter = require('./router/apiRouter.js')
const router = require('./router/router.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 定义中间件，托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

//配置模板的路径
app.set('views',__dirname  +'/views');

//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 

//使用模板引擎扩展名为html
app.set('view engine', 'html');


app.use('/api',apiRouter)

let options = {
    name :"session",
    secret: 'ffrggrdvd',
    cookie: {
        httpOnly :true,
        secure: false,
        maxAge:60000*24
    }
}
app.use(session(options))
// 前台路由

app.use(function(req,res,next){
    let path = req.path.toLowerCase();
    // console.log(path)
    let unNeed = ['/login','/signin','/logout'];
    if(unNeed.includes(path)){
        next();
    }else{
        if(req.session.userInfor){
           next()
        }else{
            res.redirect('/login')
        }
    }
})


// 使用路由中间件 req.body
app.use(router)

app.listen(4200,_=>console.log('server is running at port 4200'))