## node相关模块

# path模块 相关方法
- path.resolve
- path.basename
- path.extname
- path.dirname
- path.normalize
- path.jion
- path.parse

# fs模块 相关方法
- fs.stat/fs.statSync
- fs.readFile/fs/readFileSync
- fs.wirteFile/writeFileSync
- fs.appendFile/appendFileSync 
- fs.readdir/fs.readdirSync
- fs.access
- fs.mkdir/fs.mkdirSync
- fs.mkdir/fs.mkdirSync
- fs.rename/fs.renameSync
- fs.rmdir/fs.rmdirSync

# 事件模块 event
- emitter.addListener()
- emitter.emit()
- emitter.eventNames()
- emitter.getMaxListeners()
- emitter.listenerCount()
- emitter.listeners()
- emitter.off()
- emitter.on()
- emitter.once()
- emitter.prependListener()
- emitter.prependOnceListener()
- emitter.removeAllListeners()
- emitter.removeListener()
- emitter.setMaxListeners()

# Node.js Buffer
什么是Buffer?
Buffer是区域内存，它表示在V8 Javascript引擎外部分配的固定大小的内存块，可以将buffer视为整数数组，每个整数代表一个数据字节，它由 Node.js的Buffer类实现

为什么需要Buffer?
Buffer引入用以帮助处理二进制数据，在此生态系统中传统上只处理字符串而不是二进制数据，Buffer 与流紧密相连，当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer中

# Buffer相关方法
- Buffer.from
- Buffer.alloc
- Buffer.allocUnsafe