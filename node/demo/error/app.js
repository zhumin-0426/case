const express = require('express')
const app = new express()
const path = require('path')
const logger = require('morgan')
const port = 3000
const hostname = '127.0.0.1'
var test = app.get('env') === 'test'
if (!test) app.use(logger('dev'));
// 设置模版引擎
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
//设置静态目录
app.use('static',express.static('public'))
// 错误处理中间键函数
const error = (err,req,res,next)=>{
    if(!test){
        console.log('stack',err.stack)
    }else{
        res.status(500)
        res.send('Internal Server Error')
    }
}
app.get('/',(req,res)=>{
    throw new Error('somethink broken!')
})

app.get('/next',(req,res,next)=>{
    next(new Error('this is through next methos pass error object!'))
})
// 使用错误处理中间键
app.use(error)

app.listen(port,hostname,()=>{
    console.log(`application running on then http://${hostname}:${port}/`)
})
