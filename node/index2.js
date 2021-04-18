// fs=>文件夹
const http = require("http");
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')


    let Thunk = function (fildName) {
        return function (callback) {
            return fs.readdir(fildName, callback)
        }
    }
    var readFileThunk = Thunk('./src');
    console.log('readFileThunk',readFileThunk)
    readFileThunk(function(err,data){
        if(err){
            console.log(err)
        }
        console.log('data',data)
    });
    // fs.readdir('./src', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return false;
    //     }
    //     console.log('data', data)
    // })
    res.end('你好世界\n')
})

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})