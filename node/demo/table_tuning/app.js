const express = require('express')
const app = new express()
const path = require('path')
const port = 3000
const hostname = '127.0.0.1'
// 虚拟数据
const { Data } = require('./public/js/mock')
// 设置静态目录
app.use('/static', express.static('public'))
// 设置模版引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
// 设置错误处理函数
const error = (err, req, res, next) => {
    if (err) {
        console.log(err)
        res.status(500);
        res.send('Internal Server Error')
    }
}

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/list', (req, res) => {
    res.status(200)
    res.json(Data)
    res.end()
})

app.use(error)
app.listen(port, hostname, () => {
    console.log(`this application running to the http://${hostname}:${port}/`)
})
