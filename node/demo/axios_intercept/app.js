const express = require('express')
const app = new express()
const path = require('path')
const port = 3000
const hostname = '127.0.0.1'
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
// 设置ejs模版引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// 设置静态文件目录
app.use('/static', express.static('public'))
// Mock数据
const { mockData } = require('./public/js/mock')
//错误处理中间键函数
const error = (err, req, res, next) => {
    if (err) {
        console.log('err', err);
        res.status(500);
        res.send('loading page error!')
    }
}
// 首页
app.get('/', (req, res) => {
    res.render('login')
})
// 虚拟数据
const user = {
    account: "Mrzhu",
    password: "d033e22ae348aeb5660fc2140aec35850c4da997"
}
// 登入操作
app.post('/login', (req, res) => {
    const password = req.body.password;
    if (user['password'] === password) {
        res.status(200)
        res.json(mockData)
        res.end()
    } else {
        throw new Error('the user was not found!')
    }
})
// 判断登入token是否有效
app.post('/isLogin', (req, res) => {
    console.log(req.body)
    const obj = JSON.parse(Object.keys(req.body)[0])
    console.log(obj);
    if(obj.id){
        res.status(200)
        res.json({
            status:"success"
        })
        res.end()
    }
})
// 首页
app.get('/index', (req, res) => {
    res.render('index')
})

app.use(error)

app.listen(port, hostname, () => {
    console.log(`application service address http://${hostname}:${port}/`)
})