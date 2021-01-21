let artControll = {};
let articleData = require('../mockArticle/article.json')
const model = require('../model/model.js')
artControll.artData =async (req,res)=>{
    let {page,limit:pagesize} = req.query;
    let offset = (page - 1)*pagesize;
    let sql = `select * from article limit ${offset},${pagesize}`
    let sql2 = `select count(*) as count from article`// 数据的条数
 

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

module.exports = artControll;
