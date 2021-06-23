## Promise
Promise是异步编程的一种解决方案: 从语法上讲，promise是一个对象，从它可以获取异步操作的<br/>
的消息；从本意上讲，它是承诺，承诺它过一段时间会你一个结果。promise有三种状态:pending<br/>
(等待态)，fulfilled(成功态), rejected(失败态)；状态一旦改变，就一会再变。创建promise<br/>
实例后，会立即执行。Promise主要用来解决地狱回调；Promise支持多个并发请求，并获取并发请<br/>
求的数据。<br/>

## 需求
调用Promise返回一个promise对象