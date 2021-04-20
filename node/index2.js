// fs=>文件夹
const http = require("http");
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    
    let readFile = function(filename){
        return new Promise(function(resolve,reject){
            fs.readFile(filename,function(error,data){
               if(error){
                   console.log(error)
               }
               console.log('data',data)
            })
        })
    }
    let gen =async function(){
        let f1 = await readFile('./src/index1.txt');
        let f1 = await readFile('./src/index2.txt');
    }
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