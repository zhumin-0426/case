## axios-js
什么是axios?<br/>
axios是一个基于promise的http库，可以用在浏览器和node中

## axios 案例
```js
    // 发送get请求
    axios({
        url:"",
        method:"get",
        params:{}
    }).then(response=>{
        
    })
    //发送post请求
    axios({
        url:"",
        method:"post",
        data:{}
    }).then(response=>{
        
    })
```
*注释*：在使用get请求时，应该将参数定义在params中，在使用post请求时，应将参数定义在data对象中,在使用请求时，也可以使用方法别名，例如axios.get(url,config)

## 并发请求方法
- axios.all(iterable)
- axios.spread(callback)

## 创建实例
```js
    const instance = axios.create(config)
```
实例方法<br/>
- axios#request(config)
- axios#get(url[, config])
- axios#delete(url[, config])
- axios#head(url[, config])
- axios#options(url[, config])
- axios#post(url[, data[, config]])
- axios#put(url[, data[, config]])
- axios#patch(url[, data[, config]])

## 请求配置 config
['axios请求配置'](http://www.axios-js.com/zh-cn/docs/#axios-get-url-config 'axios请求配置')

## 配置默认值
```js
    axios.defaults.baseURL = "";
```

## 拦截器
拦截器分为请求拦截器和响应拦截器，请求拦截器在axios发送请求之前执行，响应拦截器发生在数据响应之后执行<br/>
请求拦截器：接受两个参数，一个是请求处理回调函数，一个是错误处理回调函数<br/>
响应拦截器：接受两个参数，一个是响应拦截回调函数，一个是错误处理回调函数<br/>
```js
   //请求拦截函数
   axios.interceptors.request.use(confih=>{
        // 在发送请求之前做些什么
   },error=>{
       
   })
   //响应拦截函数
   axios.interceptors.response.use(response=>{
        // 对响应数据做点什么
   },error=>{

   })    
   //移除拦截器
   const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
   axios.interceptors.request.eject(myInterceptor);
```

## 防抖和节流
防抖和节流都是为了防止频繁触发回调导致大量的计算，从而影响页面的抖动甚至是卡顿，简单的可以理解为，当我们执行ajax请求的时候，我们将ajax请求调用变为一次，防抖和节流的区别在于是以第一次为准还是以最后一次为准

## 节流
多次调用只有第一次有效<br/>
主要思路:利用时间戳判断，每次调用判断和上一次调用的时间差异确定是否需要调用，throttle实际是一个工厂函数，可以将一个函数封装为一个带有节流功能的函数

```js
module.exports.throttle = (fn, delay) => {
  // 定义上次触发时间, isExecute: 在规定时间是否已执行，防止多次调用的二次执行
  let last = 0, isExecute = 0;
  return (...args) => {
    const now = + Date.now();
    console.log("call", now, last, delay);
    if (now > last + delay) {
      last = now;
      if ( !isExecute) {
        fn.apply(this, args);
        isExecute = 1;
      }
    }
  };
};
```

## 防抖
在一段时间内，不论触发多少次回调，都已最后一次为准
```js
module.exports.debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    // 判断定时器是否存在，清除定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 重新调用setTimeout
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
```
