// The declaration should use the new keyword and start with a capital letter
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

module.exports = {
    newObj
}