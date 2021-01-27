let  userControll = {};
const model = require('../model/model.js')

// 加密
let md5 = require('md5')
let {secret:passSecret} = require('../config/app.json')
userControll.signin =async (req,res)=>{
  
    let {username,password} = req.body;
    password = md5(`${password}${passSecret}`)
    let sql = `select * from users where username='${username}' and password='${password}'`;
    let data = await model(sql);
     if(data.length){
         // 储存信息
         let userInfor = data[0];
         req.session.userInfor = userInfor;
         res.json({errcode:10009,message:'登陆成功'})
     }else{
         res.json({errcode:10010,message:'登陆失败'})
     }


}
module.exports = userControll;