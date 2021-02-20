let express = require('express')

var multer = require('multer')
var upload =multer({dest:'uploads'})
// 获取路由器
let router = express.Router();
const model = require('../model/model.js')

let controll = require('../controll/cateControll')
let artControll = require('../controll/artControll')
let userControll = require('../controll/userControll')
// 统计文章分类
router.get('cateCount',async(req,res)=>{
    let sql = `select count(*) total ,t2.name,t1.cat_id from article t1 
    left join category t2 on t1.cat_id = t2.cat_id group by  t1.cat_id`;
let data = await model(sql); 
res.json(data)
  })
  // 统计每月文章总数
  router.get('/artCount',async(req,res)=>{
    let sql = `select month(publish_date) month,count(*) as total from article 
               where year(publish_date) = year(now()) group by month(publish_date)`
            let data = await model(sql);
    res.json(data)
  })

router.get('/',(req,res)=>{
    res.render('manage.html')
    let data = {
        userInfor:req.session.userInfor
    }
    res.render('index.html',data)
})
router.get('/art_tab',(req,res)=>{
    res.render('art_tab.html')
})

router.get('/art_add',(req,res)=>{
 
    res.render('art_add.html')
})

router.get('/catIndex',controll.catIndex);

router.get('/artIndex',controll.artIndex);

router.get('/getCateData',controll.getCateData)
router.get('/artTab',artControll.artData)
router.get('/getOneCate',controll.getOneCate)
// 删除数据的接口
router.post('/delete',controll.del)
// 添加
router.get('/catAdd',controll.catAdd)

// 文章数据接口

 router.post('/postCate',controll.postCate)
 router.post('/addArt',artControll.artPost)
// // 文章编辑
 router.get('/artedit',artControll.artedit)
// // 删除文章
 router.post('/delArt',artControll.artDel)
 router.post('/postArt',artControll.postArt)
// // 图片
 router.post('/upload',upload.single('file'),artControll.upload)
// // 获取单条文章
 router.get('/getOneArt',artControll.getOneArt)
// // 修改状态
 router.post('/updStatus',artControll.updStatus)
// // 编辑文章
 router.post('/updArt',artControll.updart)


 // 渲染yonghudengluyemian
 router.get('/login',(req,res)=>{
    if(req.session.userInfor){
        res.redirect('/')
        return;
    }
     res.render('login.html')
 })
 // 用户登录
 router.post('/signin',userControll.signin)

 // 用户退出
 router.get('/logout',(req,res)=>{
     req.session.destory(err=>{
         if(err){throw err}
     })
     res.redirect('/login')
     res.json({message:'退出成功'})
 })

// 用户资料修改
router.post('/updateAvatar',userControll.updateAvatar)
// 头像
router.post('/revise',userControll.revise)
// 其他
router.post('/postUser',userControll.postUser)
module.exports = router;