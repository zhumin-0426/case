const express = require('express')
const app = new express()
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
const event = new EventEmitter()
const hostname = '127.0.0.1'
const port = 3000
// 设置模版引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// 设置静态目录
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.send('this is a http server!')
    throw new Error('错误信息')
})

app.listen(port, hostname, () => {
    console.log(`应用运行在 http://${hostname}:${port}/`)
})
