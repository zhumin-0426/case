const express = require('express')
const app = new express()
const path = require('path')
// post参数解析
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 密码加密
var hash = require("pbkdf2-password")();
// session存储
var session = require('express-session')
const port = 3000
const hostname = '127.0.0.1'
// ejs模版引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
// 中间键
app.use(session({
    secret: 'userid',
    resave: false,
    saveUninitialized: false
}))
// 设置中间键
app.use((req,res,next)=>{
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
})
app.get('/', (req, res) => {
    res.render('login/index')
})
app.get('/index',(req,res)=>{
    res.render('index/index')
}) 
// 虚拟数据库
let users = {
    Mrzhu: {
        password: "18820854754"
    }
}
/**
 * 初始加密
 * @param err:报错返回值
 * @param password:加密字段
 * @param salt:base64字符串
 * @param hash:哈希字符
*/
hash({ password: 'admin' }, function (err, password, salt, hash) {
    if (err) {
        throw err
    };
    // 初始化虚拟数据库数据
    users.Mrzhu.salt = salt;
    users.Mrzhu.hash = hash;
});

const authenticate = (account, password, fn) => {
    const user = users[account]
    // 当用户不存在的时候
    if (!user) {
        return fn(new Error('the user is not defind!'))
    } else {
        // 对密码与初始化进行比对
        hash({ password: password, salt: user.salt }, function (err, password, salt, hash) {
            if (err) return fn(err);
            if (hash === user.hash) {
                return fn(null, user)
            } else {
                fn(new Error('invalid password'));
            }
        });
    }
}
app.post('/login', (req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    authenticate(account, password, (err, user) => {
        if (err) {
            req.session.error = 'error';
            res.redirect('/');
        } else {
            // 将登入数据进行session存储 将已有的session初始化
            req.session.regenerate(()=>{
                req.session.user = user;
                req.session.success = 'success';
                res.redirect('/index');
            })
        }
    })
})
app.listen(port, hostname, () => {
    console.log(`应用运行在 http://${hostname}:${port}/`)
})