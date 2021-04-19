// fs=>文件夹
const http = require("http");
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    /*
      fs.mkdir/mkdirSync=>写入文件夹
    */
    // fs.mkdir('./upload', (err) => {
    //     if (err) {
    //         console.error(err);
    //         return false;
    //     }
    // })
    /*
      fs.readdir/readdirSync=>读取文件夹
    */
    fs.readdir('./src', (err, data) => {
        if (err) {
            console.error(err);
            return false;
        }
        console.log('data', data)
    })
    res.end('你好世界\n')
})

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})