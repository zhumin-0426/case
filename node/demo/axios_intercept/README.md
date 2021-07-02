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
