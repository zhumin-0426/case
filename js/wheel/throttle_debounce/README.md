## 防抖/节流
防抖和节流可以说是一对好基友，也是前端面试的手写热点考题。防抖和节流其实都是在规避频繁触发回调导致大量计算，从而影响页面发生抖动甚至卡顿。简单的说将多次回调比如页面点击或ajax调用变为一次。防抖和节流的区别在于以第一次为准还是最后一次为准

## 需求
### 1. 节流Throttle -  调用多次、只第一次调用有效
在一段时间内，不论触发多少次调用，都以第一次为准。
输入框补全提示，只需要每两秒补全一次。

### 2. 节流Debounce 最后一次为准
在一段时间内，不论触发多少次回调，都以最后一次为准。
比如：以用户拖拽改变窗口大小，触发 resize 事件为例，会触发组件重新布局，这里面只有最后一次调用是有意义的。

## 功能实现

### 节流
主要思路利用时间戳判断，每次调用判断和上一次调用的时间差异确定是否需要调用。
throttle实际是一个工厂函数，可以将一个函数封装为一个带有节流功能的函数。

### 防抖
实现的话可以使用定时器执行函数，新调用发生时如果旧调用没有执行就清除之前的定时器。