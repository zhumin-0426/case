const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const multiparty = require('multiparty');
const port = 3000
const hostname = '127.0.0.1'
// 静态文件目录
app.use('/static', express.static('public'))
// 静态上传目录
app.use('/upload', express.static('upload'));
// 模版引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('index/index',{imgList:[]})
})
app.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.uploadDir = 'upload'
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('err', err)
            return false;
        }
        let imgList = [];
        const file = files.file;
        file.forEach(item => {
            imgList.push(item.path)
        })
        res.render('index/index', { imgList: imgList })
    })
})
app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
})