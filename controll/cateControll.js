let cateControll = {};
const model = require('../model/model.js')

const {argsfail, delsucc,delfail,exception,notfound,addsucc, addfail,getsucc,getfail,updsucc, updfail} = require('../util/responseMessage.js')
cateControll.catIndex =(req,res)=>{
    res.render('category_index.html')
}
// 文章首页渲染控制器
// cateControll.artIndex =(req,res)=>{
//     res.render('article_index.html')
//}

// 文章数据获取控制器
cateControll.getCateData = async (req,res)=>{
 
    let sql = `select * from category order by sort desc`
    let data = await model(sql)
    res.json(data)
}
   cateControll.getOneCate = async (req,res)=>{
        // 接收参数
       let {cat_id} = req.query;
       if(!cat_id){
           res.json(argsfail)
       }else{
           let sql = `select * from category where cat_id = ${cat_id}`;
           let data = await model(sql);
           if(data.length){
                data[0].errcode = 3;
                res.json(data[0])
           }else{
               res.json(getfail)
           }
    
        }  
     
    
    }

// 文章数据删除控制器
cateControll.del =async (req,res)=>{
    let {cat_id} = req.body;
    // 判断参数，设置容错
    if(!cat_id){
        res.json(argsfail)
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`
        let result;
        let response;
        try{
            result = await model(sql);
            if(result.affectedRows){
                 response = delsucc;
            }else{
                response = delfail
            }
        }catch(e){
            response = exception
        }
             res.json(response)
    }
 }
// 分类添加
cateControll.catAdd = (req,res)=>{
    res.render('category_add.html')
}
cateControll.postCate = async (req,res)=>{
    let {name,sort,add_date} = req.body;
    let sql = `insert into category(name,sort,add_date) values('${name}',${sort},'${add_date}')`
    let result = await model(sql);
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
}
// 编辑
cateControll.cateEdit = (req,res)=>{  
    res.render('category_edit.html')
}
cateControll.updCate = async (req,res)=>{
    let {cat_id,name,sort,add_date} = req.body;
    if(!cat_id){
        res.json(argsfail);
        return
    }
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}' 
              where cat_id = ${cat_id}`;
              let result  = await model(sql);
              if(result.affectedRows){
                  res.json(updsucc)
              }else{

                res.json(updfail)
              }

            }
module.exports = cateControll;