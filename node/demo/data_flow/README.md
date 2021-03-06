前端处理大量数据渲染列表及搜索的优化方案（分页不做讨论）
------
## 中级工程师优化方案
- 懒加载+防抖
- dom离线化?
    * 在对dom有较大改动的时候，将dom元素先脱离文档流，然后对dom元素进行操作，最后将dom元素放回文档流
- 对数据做缓存处理?
    * 将数据存储在本地
- 压缩数据（gzip）?
## 高级工程师优化方案
- js缓冲器
- 虚拟长列表（可视区域渲染）
- 组件化
- 算法优化
- 多线程
- web worker（压缩和解码）
- 离屏canvas做预渲染
- 二分法（针对搜索）

## 懒加载 
原理：优先加载可视区域的内容，其他部分等到进入可视区域再进行加载

实现思路：利用可视区域高度+滚动条距离顶部高度+元素距离顶部高度进行判断
```css
    * {
        text-decoration: none;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    h2 {
        padding: 10px;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
    }

    ul li {
        flex-basis: 100%;
        padding: 10px;
        break-inside: avoid;
    }

    li .cell {
        padding: 10px;
        border: solid 1px #ccc;
        border-radius: 10px;
    }

    li .cell img {
        display: block;
        max-width: 100%;
        max-height: 100px;
    }

    li .cell span {
        display: block;
        text-align: center;
        color: #333;
    }
```
```html
    <h2>数据流=>懒加载</h2>
    <ul class="box">
        <li>
            <img src="http://127.0.0.1:3000/static/images/loading.gif" alt="">
        </li>
    </ul>
```
```js
    // 防抖函数
    const debounce = (fn, time) => {
        let timer;
        return function (...ages) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(this, ages)
            }, time)
        }
    }
    ((init) => {
        // 初始加载数据
        init.getData = () => {
            const box = document.getElementsByClassName('box')[0];
            const instance = axios.create({
                baseURL: "http://127.0.0.1:3000/"
            })
            instance.post('getData').then(res => {
                const data = res.data.Data.flow;
                let html = '';
                data.forEach(item => {
                    html += ` <li>
                        <div class="cell">
                            <img _src="${item.img}" alt="">
                            <span>${item.name}</span>    
                        </div>
                    </li>`
                })
                box.innerHTML = html;
                // 获取所有的li元素
                const imgs = document.getElementsByTagName('img');
                // 获取可视区域高度
                const seeHeight = document.documentElement.clientHeight;
                // 获取滚动条距离顶部的高度
                let scollH = document.documentElement.scrollTop || document.body.scrollTop;
                for (let i = 0; i < imgs.length; i++) {
                    if (imgs[i].offsetTop <= seeHeight + scollH) {
                        imgs[i].src = data[i].img
                    }else{
                        imgs[i].src = "http://127.0.0.1:3000/static/images/apple.jpeg"
                    }
                }
            }).catch(err => {
                console.log('err', err)
            })
        }
        init.getData()
    })({})
    // 获取所有的li元素
    const imgs = document.getElementsByTagName('img');
    // 获取可视区域高度
    const seeHeight = document.documentElement.clientHeight;
    const lazyLoading = (img, seeHeight) => {
        // 获取滚动条距离顶部的高度
        let scollH = document.documentElement.scrollTop || document.body.scrollTop;
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].offsetTop <= seeHeight + scollH) {
                imgs[i].src = imgs[i].getAttribute('_src')
            }
        }
    }
    window, onscroll = () => {
        let fn = debounce(lazyLoading, 600);
        fn(imgs, seeHeight)
    }
```
## 虚拟长列表
重要概念
- 可滚的区域
假设有 1000 条数据，每个列表项的高度是 30，那么可滚动的区域的高度就是 1000 * 30。当用户改变列表的滚动条的当前滚动值的时候，会造成可见区域的内容的变更<br/>
- 可见区域
比如列表的高度是 300，右侧有纵向滚动条可以滚动，那么视觉可见的区域就是可见区域<br/>

*实现思路*
1.计算可见区域起始数据的startIndex
2.计算可见区域结束数据的endIndex
3.计算当前可见区域的数据，并渲染到页面中
4.计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上


