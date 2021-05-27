const http = require("http");
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 8080;

function time() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('./src/index.txt')
    })
  })
}
function readFiles(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, function (err, data) {
      if (err) {
        console.log('err', err)
      } else {
        resolve(data)
      }
    })
  })
}
async function All() {
  var filesrc = await time();
  var data = await readFiles(filesrc);
  return data;
}
All().then(function (res) {
  console.log('res', res)
})

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  fs.readFile('./src/index.text', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log('data', data)
    }
  })

  res.end('你好世界\n')
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})