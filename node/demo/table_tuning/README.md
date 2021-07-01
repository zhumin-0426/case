## Mock.js
作用 ：生成虚拟数据

## 数据模版定义规范
属性值是字符串的String
```js
'name'|'rule':value //name:属性名称 rule:定义规则 value:属性值
```
## 数据模版生成规则
- 'name':'min-max':value
- 'name':'count':value
- 'name':'min-max.dmin-dmax':value
- 'name':'min-max.dcount':value
- 'name':'count.dmin-dmax':value
- 'name':'count.dcount':value
- 'name':'+step':value

## 数据占位符定义规范
具体看文档示例：[Mock.js](https://github.com/nuysoft/Mock/wiki/Syntax-Specification "Mock.js官方文档")

## Mock.mock
- Mock.mock(template) 
根据数据模版生成模拟数据
```js
   Mock.mock({
       'name'|'2':'value'
   })
   //{name:'valuevalue'}
```
- Moch.mock(rurl,template)
拦截（匹配）数据请求url
```js
    Mock.mock(/\.json/,{
        'name'|'2':'value'
    })
    $ajax({
        url:"hello.json",
        dataType:"json",
    }).done(function(data,status,jqXHR){
        $('<pre>').text(JSON.stringify(data, null, 4))
        .appendTo('body')
    })
```
- Moch.mock(rurl,rtype,template)
拦截（匹配）请求方法类型：Get,Post,Put...
```js
    Mock.mock(/\.json/,'post',{
        'name'|'2':'value'
    })
    $ajax({
        url:"hello.json",
        type:'post',
        dataType:"json",
    }).done(function(data,status,jqXHR){
        $('<pre>').text(JSON.stringify(data, null, 4))
        .appendTo('body')
    })
```
- Moch.setup
Mock.setup(setting)
配置拦截 Ajax 请求时的行为，支持的配置项有：timeout
setting:必选
timeout:可选，指定被拦截的 Ajax 请求的响应时间，单位是毫秒，值可以是整数，也可以是‘-’风格，指定请求时间的范围： '200-600'

```js
    Mock.setup({
        time:400
    })
//
    Mock.setup({
        time:'200-600'
    })
```
- Mock.Random
Mock.Random 是一个工具类，用于生成各种随机数据，Mock.Random 中的方法与数据模板的 @占位符 一一对应
具体可翻看文档 ['Mock.js'](https://github.com/nuysoft/Mock/wiki/Mock.Random "Mock.js文档")
- Mock.valid
校验真实数据 data 是否与数据模板 template 匹配
```js
   Mock.valid(template,data)
   //template:必选，表示数据模版，可以是对象或字符串
   //data:表示真实数据
```
- Mock.toJSONSchema
把 Mock.js 风格的数据模板 template 转换成 JSON Schema
```js
    var template = {
        'key|1-10': '★'
    }
    Mock.toJSONSchema(template)
    // =>
    {
        "name": undefined,
        "path": [
            "ROOT"
        ],
        "type": "object",
        "template": {
            "key|1-10": "★"
        },
        "rule": {},
        "properties": [{
            "name": "key",
            "path": [
                "ROOT",
                "key"
            ],
            "type": "string",
            "template": "★",
            "rule": {
                "parameters": ["key|1-10", "key", null, "1-10", null],
                "range": ["1-10", "1", "10"],
                "min": 1,
                "max": 10,
                "count": 3,
                "decimal": undefined,
                "dmin": undefined,
                "dmax": undefined,
                "dcount": undefined
            }
        }]
    }

```

## Axios.js





