let express = require('express')


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

router.get('/getOneCate',controll.getOneCate)
// 删除数据的接口
router.post('/delete',controll.del)
// 添加
router.get('/catAdd',controll.catAdd)

// 文章数据接口
router.get('/artTab',artControll.artData)
router.post('/postCate',controll.postCate)

module.exports = router;