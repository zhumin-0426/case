const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('你好世界\n')
})
http.get('/index',function(req,res){
   res.send("hellow world")
   res.end()
})
server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})