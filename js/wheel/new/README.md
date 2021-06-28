## new关键字
在es5中一般用new关键字创建一个自定义对象(构造函数)，但是为什么我们在使用该关键字时返回的是一个对象呢？其实这和javascript解释引擎有关，javascript解释引擎碰到new关键字的时候，会首先创建一个对象{}，//并且每一个构造函数//都使用apply方法绑定创建的对象，并且将当前函数的实例__proto__指向构造函数的原型

用测试用例表示
```js

const newObj = (target) => {
    // 创建对象
    let obj = {};
    // 获取参数
    let params = Array.from(arguments);
    params.shift()
    // 目标函数绑定到该obj返回对象上面
    target.apply(obj, params);
    // 将obj返回对象的原型继承自目标函数的原型
    obj.__proto__ = target.prototype
    // 判断构造函数的返回值是否是一个对象
    const isObj = target.apply(obj, params);
    if ((typeof isObj === 'object' ||typeof isObj === 'function') && isObj !== null) {
        return isObj
    }
    // 返回对象
    return obj;
}