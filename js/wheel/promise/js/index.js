const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED"

/**
 * 基础版Promise，提供最基础的功能
 * */

class BasePromise {
  state = PENDING; // 定义初始状态
  value = undefined; //保存成功状态的值
  reason = undefined; //保存失败状态的值
  resolveCallBackQueue = [] //保存成功状态的回调函数
  rejectCallBackQueue = [] //保存失败状态的回调函数
  constructor(executor) {
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        // 依次执行成功状态的回调函数
        this.resolveCallBackQueue.forEach(fn => fn())
      }
    }

    const reject = (value) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = value;
        // 依次执行失败状态的回调函数
        this.rejectCallBackQueue.forEach(fn => fn())
      }
    }

    try {
      // 立即执行, 将resolve和reject函数传给使用者
      executor(resolve, reject)
    } catch (error) {
      // 发生异常是执行逻辑
      reject(error)
    }
  }
  // 包含一个then方法,并接收两个参数resolveCallBack, rejectCallBack
  then(resolveCallBack, rejectCallBack) {
    if (this.state === FULFILLED) {
      resolveCallBack(this.value)
    }
    else if (this.state === REJECTED) {
      rejectCallBack(this.reason)
    }
    else if (this.state === PENDING) {
      this.resolveCallBackQueue.push(() => resolveCallBack(this.value));
      this.rejectCallBackQueue.push(() => rejectCallBack(this.reason));
    }
  }
}

/**
 * 完整版的promise
 * 完整版的promise具有值的穿透性，即在then方法中的回调函数中返回一个值的时候，在下一个then方法中的回调函数中
 * 可以获取到，实现的思路：在执行then方法时，我们返回一个promise对象，并将上一个then方法中的回调函数返回的值
 * 传递到then方法返回的promise对象中，就可以实现promise的穿透性
 * */
function resolvePromise(promise2, x, resolve, reject) {

}

class FullPromise extends BasePromise {
  constructor(executor) {
    super(executor)
  }

  // 从写then方法
  then(resolveCallBack, rejectCallBack) {
    // 判断then方法是否有传递参数
    resolveCallBack = typeof resolveCallBack === "function" ? resolveCallBack : v => v;
    rejectCallBack = typeof rejectCallBack === "function" ? rejectCallBack : error => { throw error; };
    // 返回一个promise对象
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = resolveCallBack(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
    })

    return promise2;
  }
}

module.exports = {
  BasePromise
}