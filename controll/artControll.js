
const fs = require('fs')
let artControll = {};
let articleData = require('../mockArticle/article.json')
const model = require('../model/model.js')
artControll.artData =async (req,res)=>{
    let {page,limit:pagesize,title,status} = req.query;
  
     let where = 'where 1'
     title && (where += `and t1.title like '%${title}%'`)
     status && (where += `and t1.status='${status}' `)
    let offset = (page - 1)*pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on ti.cat_id = t2.cat_id ${where} order by t1.art_id desc limit ${offset},${pagesize}`
    let sql2 = `select count(*) as count from article t1 ${where}`// 数据的条数
 

let pro1 = model(sql)
let pro2 = model(sql2)
let result = await Promise.all([pro1,pro2])
    let data = result[0];
    let count = result[1][0].count

    let response = {
        code: 0,
        count:1000,
        data:dataCount[0].count,
        msg:''
    }
    res.json(response)
    
}
artControll.artDel =async (req,res)=>{
    let {art_id} = req.body;
    let sql = `delect from article  where art_id = ${art_id}`;
    let result =await model(sql);
    if(result.affectedRows){
        res.json(delsucc)
    }else{

      res.json(delfail)
    }
}
artControll.artPost = async (req,res)=>{
    let {title,cat_data,status,content,cover,publih_date} = req.body;
    let sql = `insert into artcile(title,content,cat_id,status,cover,publish_date) values('${title}',${content},'${cat_data}','${status}','${cover}',now())`
    let result = await model(sql);
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
}
artControll.postArt = async (req,res)=>{
    let {title,cat_id,status,content,cover} = req.body;
    let username = req.session.userInfo.username
    let sql = `insert into article(title,content,author,cat_id,status,cover,publish_date)
                values('${title}','${content}','${username}',${cat_id},${status},'${cover}',now())
                `;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }

}
artControll.artedit = (req,res)=>{
    res.render('artedit.html')}



// 上传
artControll.upload = (req,res)=>{
    if(req.file){
        // 进行文件的重命名即可 fs.rename
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
// 请求接口
artControll.updStatus =async(req,res)=>{
    let {art_id,status} = req.body;
    let sql = `update article set status = ${status} where art_id = ${art_id}`
    let result = await model(sql)
    if(result.affectedRows){
        res.json(updsucc)
    }else{
        res.json(updfail)
    }
}
// 获取单条文章
artControll.getOneArt =async (req,res)=>{
    let {art_id} = req.query;
    let sql = `select * from article where art_id = ${art_id}`;
    let result = await model(sql)
    res.json(result[0] || {})
}
// 编辑文章
 artControll.updart =async (req,res)=>{
     // 接受数据
     let {oldCover,title,cat_id,art_id,cover,content,status} = req.body;
     let sql;
       if(cover){
        sql = `update article set title='${title}',content='${content}',cover='${cover}',
        cat_id='${cat_id}',status='${status}' where art_id = ${art_id}
`
    }
       else{
        sql = `update article set title='${title}',content='${content}',
        cat_id='${cat_id}',status='${status}' where art_id = ${art_id}
`
       }
     let result = await model(sql)
     if(result.affectedRows){
         
        cover && fs.unlinkSync(oldCover)
        res.json(updsucc)
     }else{
         res.json(updfail)
     }
}
module.exports = artControll;
