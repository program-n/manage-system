let express = require('express')

var multer = require('multer')
var upload =multer({dest:'uploads'})
// 获取路由器
let router = express.Router();


let controll = require('../controll/cateControll')
let artControll = require('../controll/artControll')
router.get('/',(req,res)=>{
    res.render('manage.html')
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
// 文章编辑
router.get('/artedit',artControll.artedit)
// 删除文章
router.post('/delArt',artControll.artDel)
router.post('/postArt',artControll.postArt)
// 图片
router.post('/upload',upload.single('file'),artControll.upload)
// 获取单条文章
router.get('/getOneArt',artControll.getOneArt)
// 修改状态
router.post('/updStatus',artControll.updStatus)
module.exports = router;