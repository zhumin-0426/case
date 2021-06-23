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

/**
 * @promise2 返回的promise对象
 * @x then方法中resolve函数的返回值
 * @resolve 返回的promise对象中的resolve函数
 * @reject 返回的promise对象中的reject函数
 * */
function resolvePromise(promise2, x, resolve, reject) {
  // 如果自己等待自己完成则是错误的实现，用一个类型错误，结束掉promise
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  let called;                              // 是否已调用，只调用一次
  // 当x返回值不为普通值时
  if ((typeof x === 'object' && x !== null) || typeof x === "function") {
    try {
      // 为了判断resolve执行过就不再reject了(如reject与resolve同时调用的时候)
      let then = x.then;
      if (typeof then === 'function') {
        // 不要写成x.then，直接then.call就可以了, 因为x.then会再次取值。
        then.call(x, y => {
          // 如果执行过，则不再执行
          if (called) { return; }

          called = true;
          // 递归解析(因为可能promise中还有promise)
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          // 只要失败就reject
          if (called) { return; }
          called = true;
          reject(r)
        })
      }
      else {
        // 如果x.then是一个普通值就直接返回resolve作为结果
        resolve(x);
      }
    } catch (error) {
      if (called) { return; }
      called = true;
      reject(error);
    }
  } else {
    resolve(x)
  }
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

      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = rejectCallBack(this.reason);
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.resolveCallBackQueue.push(() => {
          try {
            const x = resolveCallBack(this.value);
            resolvePromise(promise2, x, resolve, reject);
          }
          catch (error) {
            reject(error);
          }
        });

        this.rejectCallBackQueue.push(() => {
          try {
            const x = rejectCallBack(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          }
          catch (error) {
            reject(error);
          }
        });
      }
    })

    return promise2;
  }
}

module.exports = {
  BasePromise,
  FullPromise
}