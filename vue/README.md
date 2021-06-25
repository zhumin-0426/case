    /**
    *1.为什么data是一个函数?
    *data是一个函数，数据以函数的返回值定义，这样保证了数据的唯一性
    *也提高的Vue组件重复利用性，每次调用调用同一个组件的数据相关不影响
    *如果换成简单的对象，那么所有的同一个组件将使用同一个对象，一个组件改变数据，其他的组件也跟着改变
    *在vue后端规范会选项时，也是将实例上的data合并成一个函数
    */

    /**
    *2.Vue组件通讯有哪几种方式?
    *(1)当父组件向子组件传值的时候可以使用props
    *(2)也可向父组件传递一个ref属性，获取父组件实例，从而获取data
    *(3)也可使用$parent获取父组件实例，从而获取父组件实例
    *(4)当我们需要和根组件通信的时候可以使用$root获取gen组件实例
    *(5)当子组件向父组件通信时可以使用$emit
    *(6)当父组件向需要向子组件通信时可以使用$children
    *(7)当需要父组件提供子组件数据时，可使用provide提供，inject引入
    *(8)当envetBus 兄弟组件数据传递 这种情况下可以使用事件总线的方式
    *(9)当有多层级组件嵌套时，可以使用$attr/$listeners
    *(10)vuex 状态管理
    */

    /**
    *3.v-if和v-show的区别?
    *v-if 在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点，v-if适用于很少切换的场景
    *v-show 会被编译成指令，条件不满足时控制样式将对应节点隐藏 （display:none）v-show适用于频繁切换的场景
    */

    /**
    *3.computer和watch的区别和运用场景?
    *computer是计算属性 依赖于其他数据进行变化 且计算属性具有缓存的功能 只有当数据改变世界才会计算，且可以设置getter/setter
    *watch由于对数据的监测 数据发生变化时就会执行回调 在回调中书写逻辑
    *计算属性一般用于模版渲染 侦听属性一般用于监测某个数据然后在回调中书写逻辑
    */

    /**
    *4.v-if和v-for为什么不建议一起使用？
    *因为存在一个优先级的关系 后者的优先级大于前者的优先级 如果需要同时使用时 可以考虑计算属性
    */

    /**
     * vue2.0响应式数据的原理?
     * 首先将合并的数据属性转化为访问器属性，并在数据属性中添加相应的依赖（即watcher类）
     * 利用watcher类观察渲染函数，若指发生变化，在watcher类中会重新对渲染函数进行求值，此时就会重新渲染模版
     * 构成响应式
     * */

    /**
     * 5.vue 如何检测数组的变化?
     * 利用变异方法拦截的思想，首先定义一个对象，然后该对象的原型继承自数组的原型
     * 再对该对象方法进行拦截，然后将新数组的原型指向该对象
     * */

    /**
     * 6.父子组件生命周期函数的执行顺序
     * 加载渲染的顺序
     * 父beforecreate->父create->父beforemount->子beforecreate->子create->子beforemount->子mount->父mount、
     * 子组件更新过程
     * 父beforeupdata->子beforeUpdata->子Updata->父updata
     * 父组件更新过程
     * 父beforeupdata->父updata
     * 销毁过程
     * 父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed
     * */

    /**
     * v-model实现原理?
     * v-model本质上只是一个语法糖而已，在内部依据不同的元素抛出不同的事件
     * text 和 textarea 元素使用 value 属性和 input 事件；
     *checkbox 和 radio 使用 checked 属性和 change 事件；
     *select 字段将 value 作为 prop 并将 change 作为事件。
     * */

    /**
     * vue中使用了哪些设计模式?
     * 观察者模式(响应数据原理)
     * 策略模式（选项合并）
     * 单例模式（vue整个项目有且紧有一个vue实例）
     * */

    /**
     * 你做过哪些vue项目优化?
     * 合理使用v-for,v-if
     * 合理使用keep-alive缓存组件
     * 图片懒加载
     * 路由懒加载
     * 每一个v-for都加key
     * */

    /**
     * 为什么根元素必须使用id命名
     * 因为在vue挂载组件的时候 是根据document.getElementId()方法获取的
     * */

    /**
     * 在获取模版时时如何获取到svg元素的？
     * 因为svg不存在innerHTML/outerHTML属性，所以vue在svg元素的时候是在svg元素的外层添加一个div，然后根据这个div元素来获取svg
     * */

    /**
     * vue是如何进行性能检测的?
     * 是根据performance.mark()函数进行性能检测的
     * */

    /**
     * vue注册的全局组件的缺点？
     * 如果在使用Babel或者wenpack的时候，vue注册的组件不管你有没有使用
     * 都会被编译进入口文件里面，这样就会造成无关代码的添加
     * */

    /**
     *  vue-router 路由钩子函数是什么 执行顺序是什么?
     *全局守卫 路由守卫 组件守卫
     * */


    /**
     *  vue-router 动态路由是什么 有什么问题?
     * 我们经常利用id来进行数据请求，以此来显示不同的数据，这个时候一般会利用动态路由，动态路由一般以/:id出现 id为动态参数
     * 那组件一般是可以复用的，但是组件复用的时候动态参数有可能失效，这个时候怎么办？
     * 1.使用watch监听$route,使用监听到的this.$route.params.xxx重新进行数据请求
     * */
    /**
     * 谈一下对vuex的个人理解
     * vuex主要是用来形成一个状态管理的，个人理解为将组件的公共状态进行一个抽离
     * vuex的主要核心模块有state,getters,mutations,actions,modules
     *
     * */

    /**
     * vuex页面属性数据丢失怎么解决？
     * 可以使用本地存储将数据进行储存，可以使用自己的存储方案，也可以使用第三方插件（vuex-persist）
     * */

    /**
     * vuex为什么需要加模块和命名空间？
     * 模块：当数据达到一定程度的时候，store就会显得比较臃肿，这个时候就可以使用模块化进行代码分割，每一个子模块都包含相同的getter...d等属性
     *
     * 命名空间：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
     * 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
     * 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
     * */

    /**
     * 为什么props能初始化data
     * 因为在vue中 初始化props会在初始化data之前，即早于初始化data
     * */  
    /**
     * vue.mixins使用场景及原理？
     *
     * */
    /**
     * nextTick 使用场景和原理?
     * */

    /**
     * keep-alive 使用场景和原理?
     * */

    /**
     * Vue.set 方法原理?
     * */

    /**
     * Vue.extend 作用和原理?
     * */

    /**
     * 能说下 vue-router 中常用的路由模式实现原理吗?
     * */

    /**
     * 生命周期钩子是如何实现的?
     * 生命周期钩子核心是采用发布订阅模式实现的
     * 在选项合并的时候，我们会将相应生命钩子函数合并成一个数组
     * 之后在通callhook来循环这个数组并依次使用call方法执行执行
     * */ 

    /**
     * 自定义指令原理？
     * */

    /**
     * 模版编译原理？
     * */

    /**
     * 函数式组件使用场景和原理？
     * */

    /**
     * diff算法了解吗？
     * */