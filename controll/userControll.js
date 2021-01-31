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


userControll.revise = (req,res)=>{
    // 头像更改
    if(req.file){
        // 进行文件的重命名 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({code:0,message:'上传文件成功',src:newPath})
        })
    }else{
        res.json({code:1,message:'上传文件失败',src:''})
    }
}
 // 个人资料更改
artControll.postArt = async (req,res)=>{
    let {user_id,username,avatar} = req.body;
    let username = req.session.userInfo.username
    let sql = `insert into article(user_id,username,avatat)
                values(,'${username}','${user_id}','${avatar}',now())
                `;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(upsucc)
    }else{
        res.json(upfail)
    }

}
module.exports = userControll;