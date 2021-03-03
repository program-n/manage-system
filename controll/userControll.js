let  userControll = {};
const model = require('../model/model.js')
const {argsfail, delsucc,delfail,exception,notfound,addsucc, addfail,getsucc,getfail,updsucc, updfail} = require('../util/responseMessage.js')
// 加密
let md5 = require('md5')
let {secret:passSecret} = require('../config/app.json')
userControll.signin =async (req,res)=>{
  
    let {username,password} = req.body;
    
    password = md5(password+passSecret)
    let sql = `select * from users where username='${username}' and password='${password}'`;
   
    let data = await model(sql);

     if(data.length){
         // 储存信息
         let userInfor = data[0];
        
         req.session.userInfor = userInfor;
         console.log(req.session.userInfor);
       
         let sql = `update users set last_login_date = now() where user_id = ${userInfor.user_id}`
         await model(sql);
         res.json({errcode:10009,message:'登陆成功',userInfor})
     }else{
         res.json({errcode:10010,message:'登陆失败'})
     }
    }


// userControll.revise = (req,res)=>{
//     // 头像更改
//     if(req.file){
//         // 进行文件的重命名 fs.rename
//         let {originalname,destination,filename} = req.file;
//         let dotIndex = originalname.lastIndexOf('.');
//         let ext = originalname.substring(dotIndex);
//         let oldPath = `${destination}${filename}`;
//         let newPath = `${destination}${filename}${ext}`;
//         fs.rename(oldPath,newPath,err=>{
//             if(err){ throw err; }
//             res.json({code:0,message:'上传文件成功',src:newPath})
//         })
//     }else{
//         res.json({code:1,message:'上传文件失败',src:''})
//     }
// }
 //个人资料更改
 userControll.postUser = async (req,res)=>{
    let {user_id,username,avatar} = req.body;
      req.session.userInfor.username  = username;
    let sql = `insert into article(user_id,username,avatat)
                values('${username}','${user_id}','${avatar}',now())
                `;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(upsucc)
    }else{
        res.json(upfail)
    }

}
userControll.updateAvatar = async (req,res)=>{
    let {avatar} = req.body;
    let user_id = req.session.userInfor.user_id;
    let sql = `update users set avatar = '${avatar}' where user_id = ${user_id}`;
    let result = await model(sql);
    if(result.affectedRows){
        res.json({code:0,message:'修改头像成功'})
    }else{
        res.json({code:1,message:'修改头像失败'})
    }
} 


module.exports = userControll