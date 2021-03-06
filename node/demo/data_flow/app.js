const express = require('express')
const app = new express()
const path = require('path')
const port = 3000
const hostname = '127.0.0.1'
// 虚拟数据
const lazyLoadingData = require('./public/js/lazyLoadingMock')
const { virtualListData } = require('./public/js/virtualListMock')
// 定义静态目录
app.use('/static', express.static('public'))
// 定义模版引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const error = (err, req, res, next) => {
    if (err) {
        console.log('err', err)
        res.status(500)
        res.send('Internal Server Error!')
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.render('virtualList')
})
app.post('/getLazyLoadingData', (req, res) => {
    res.status(200)
    res.json(lazyLoadingData)
    res.end()
})


app.post('/getVirtualListData', (req, res) => {
    res.status(200)
    res.json(virtualListData)
    res.end()
})

app.use(error)

app.listen(port, hostname, () => {
    console.log(`应用运行在 http://${hostname}:${port}/`)
})