// fs=>文件
const http = require("http");
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    /*
    fs.stat:读取文件信息
    */
    // fs.stat('./src/index.txt',(err,fd)=>{
    //     if(err){
    //         console.error('err',err)
    //     }else{
    // console.log('isFile', stats.isFile());//判断是否文件
    // console.log('isDirectory', stats.isDirectory());//判断是否为目录
    // console.log('isSymbolicLink', stats.isSymbolicLink());//判断是否为符号链接
    // console.log('size', stats.size);//判断文件大小
    //     }
    // })
    /*
        fs.readFile/readFileSyce 读取文件 注释：readFile和readFileSyce都会将文件的全部读取到内存中，这意味着当读取大文件时会
        消耗内存，且会影响程序的执行速度
    */
    // fs.readFile('./src/index.txt','utf-8', (err, data) => {
    //     if (err) {
    //         console.error('err', err)
    //     } else {
    //         console.log("data",data)
    //     }
    // })
    /*
            fs.writeFile/fs.writeFileSync()：写入文件
    */
    // let content = "这是我写入的文件内容1"
    // fs.writeFile('./src/index.txt', content,{flag:'w+'}, (err) => {
    //     if (err) {
    //         console.error('err', err)
    //     } else {
    //         console.log("data", data)
    //     }
    // })
    /*
            fs.appendFile:文件追加内容
    */
    // fs.appendFile('./src/index.txt', content, (err) => {
    //     if (err) {
    //         console.error('err', err)
    //         return
    //     }
    // })
    res.end('你好世界\n')
})

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})