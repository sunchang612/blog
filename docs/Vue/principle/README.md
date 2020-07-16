# Vue 面试题总结

## Vue 中的 computed 和 watch 的区别 ？
- 功能上：<font color="red">computed 是计算属性，也就是依赖其它的属性计算后所得出的值。</font> <font color="#f28500">watch是去监听一个值的变化，然后执行相应的函数</font>
- 使用上：<font color="red">computed 中的函数必须使用 return 返回；</font>，<font color="#f28500">watch 的回调里面传入监听属性的新旧值，通过这两个值可以做一些特定的操作，不是必须要return </font>
- 性能上：<font color="red">computed 中的函数所依赖的属性没有发生变化，那么调用当前函数的时候回从缓存中读取</font>，<font color="#f28500">而 watch 在每次监听值发生变化的时候都会执行回调，支持对属性的深度监听。</font>
- 场景上：computed 当一个属性受多个属性影响的时候，例如：商品结算；watch：当一条数据影响多个数据的时候。例如：分页

## Vue 中 computed 是如何实现的
- <font color="red"> computed 内部实现了一个惰性的 watcher</font>，在实例化的时候不会去求值，<font color="#f28500">其内部通过 dirty 属性标记计算属性是否需要重新求值</font>。当 computed 依赖的任意状态发生改变，都会通知这个惰性的 watcher，让它把 dirty 属性设置为 true，所以，当再次读取这个计算属性的时候，就会重新去求值。
> <font color="red">惰性的watcher 计算属性在创建时不会去求值的，是在使用时去求值</font>。

## Vue $nextTick 的原理
- Vue 在默认情况下，<font color="red">每次触发某个数据的 setter 方法后，对应的 watcher 对象其实会被 push 进入一个队列 Queue 中，在下一个 tick 的时候将这个队列 queue 全部拿出来 run （Watcher 对象的一个方法，用来触发 patch 操作） 一遍。</font>
- <font color="red">nextTick(callback) 优先使用生成 微任务的 promise.then 和 MutationObserver，</font>如果浏览器不支持，才用 setImmediate ， setTimeout 等替代。
- 如果一个变量更新多次，例如：number ++ 从 0 到 100，只需要更新一个视图即可，就是 0 变成 100，<font color="red">在同一 watcher 在同一个 tick 的时候应该只被执行一次，也就是说队列中不应该出现重复的 watcher 对象。用id 来标记每个 watcher 对象。</font>

## SPA 单页面的理解，它的优缺点分别是什么 ？
- sing-page application 仅在 web 页面初始化时加载响应的 HTML JavaScript 和 css。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内部的变换，UI与用户的交互，避免页面的重新加载。

### 优点：
1. 用户体验好，快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
2. 基于1的优点，SPA 相对对服务器的压力小；
3. 前后端分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

### 缺点:
1. 初次加载消耗多，问了实现单页 web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 同一加载，部分页面按需加载
2. 前进后退路由管理： 由于单页面应用在一个页面上显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理。
3. SEO 难度较大： 由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上有着天然的劣势。