const {BasePromise} = require('./js/index');
// 基础班promise测试

it('基础版promise测试成功状态!', (done) => {
  const promise = new BasePromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('success')
    },50)
  })

  promise.then(res=>{
    expect(res).toBe('success')
    done()
  })
});

it('基础版promise测试失败状态!',(done)=>{
  const promise = new BasePromise((resolve,reject)=>{
    setTimeout(()=>{
      reject('error')
    },50)
  })

  promise.then((data)=>{
    console.log('resolve data: ', data)
  },(error)=>{
    expect(error).toBe('error')
    done()
  })
})