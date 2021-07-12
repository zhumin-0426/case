## rollup
简介：rollup是一个模块打包器，能将小块的代码打包成大块的代码，例如Library和应用程序

## 导出相关命令行
rollup entry.js format cjs<br/>
该命令行将会在终端打印出代码<br/>
rollup entry.js output src/bundle.js format cjs<br/>
该命令行将会以文件的形式导出<br/>
rollup --config<br/>
以配置文件相关设置导出, 默认找到rollup.config.js, 也可以使用自定义的配置文件 例如: myrollup.config.js, 导出的命令行为: rollup --config myrollup.config.js<br/>
rollup --config output src/dist<br/>
此命令行会覆盖配置文件当中的相关设置
## 配置文件的相关参数
```js
export default {
    inpit:"",//入口文件
    output:{//出口文件
        file:"",//写入文件
        format:"",//写入文件格式
        name:""//生成包的名称, 代表你的 iife/umd 包, 同一页上的其他脚本可以访问它
    },
    plugins:[],//插件
    external:[], //外链, 该属性的值是一个数组或者一个函数, 
    globals:{},//全局模块, id: name 键值对，用于umd/iife包
    path:{},//Function，它获取一个ID并返回一个路径，或者id：path对的Object。在提供的位置，这些路径将被用于生成的包而不是模块ID
    banner:"",//前置到文件束
    footer:"",//追加到文件束
    intro:"",//类似于 banner
    outro:"",//类似于 footer
    onwarn:new Function(),//拦截警告信息
    sourcemap:Boolean,//如果 true，将创建一个单独的sourcemap文件。如果 inline，sourcemap将作为数据URI附加到生成的output文件中
    sourcemapFile:"",//生成的包的位置,如果这是一个绝对路径，sourcemap中的所有源代码路径都将相对于它。 map.file属性是sourcemapFile的基本名称(basename)，因为sourcemap的位置被假定为与bundle相邻
    interop:Boolean,//是否添加'interop块 默认为true
    treeshake:Boolean,//是否应用tree-shaking
    acorn:Boolean,//任何应该传递给Acorn的选项
    context:"",//默认情况下，模块的上下文 - 即顶级的this的值为undefined。在极少数情况下，您可能需要将其更改为其他内容，如 'window'
    moduleContext:{},//和options.context一样，但是每个模块可以是id: context对的对象，也可以是id => context函数
    legacy:"",//为了增加对诸如IE8之类的旧版环境的支持，通过剥离更多可能无法正常工作的现代化的代码，其代价是偏离ES6模块环境所需的精确规范
    exports:"",//使用什么导出模式。默认为auto，它根据entry模块导出的内容猜测你的意图
    amd:{
        amd.id,//用于 AMD/UMD 软件包的ID
        amd.define//要使用的函数名称，而不是 define
    },
    indent:true,// 是要使用的缩进字符串，对于需要缩进代码的格式（amd，iife，umd）
    strict:Boolean,//true或false（默认为true） - 是否在生成的非ES6软件包的顶部包含'use strict'pragma
    watch:{
        chokidar:Boolean,//表示应该使用 chokidar 而不是内置的 fs.watch，或者是一个传递给 chokidar 的选项对象
        include:""//限制文件监控至某些文件
        exclude:""//exclude防止文件被监控
    }
}
```
## 生成包的格式如下
* amd – 异步模块定义，用于像RequireJS这样的模块加载器
* cjs – CommonJS，适用于 Node 和 Browserify/Webpack
* esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
* iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
* umd – 通用模块定义，以amd，cjs 和 iife 为一体
* system - SystemJS 加载器格式