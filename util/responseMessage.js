
const responseMessage = {
    argsfail: {errcode:10001,messag:"参数错误"},
    delsucc: {errcode:0,message:"删除成功"},
    delfail: {errcode:10002,message:"删除失败，请重新再试"},
    exception: {errcode:10003,message:"服务器繁忙，请稍后再试"},
    notfound:{errcode:10004,message:"not find this url"},
    addsucc: {errcode:1,message:'添加成功'},
    addfail:{errcode:10005,message:'添加失败'},
    getsucc: {errcode:2,message:'获取成功'},
    getfail:{errcode:10006,message:'获取信息失败'},
    updsucc: {errcode:3,message:'编辑成功'},
    updfail:{errcode:10007,message:'编辑失败'},
}

module.exports = responseMessage;