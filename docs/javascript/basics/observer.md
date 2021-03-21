# 观察者模式

- 什么是观察者模式
观察者模式定义了对象间的一种“一对多”的依赖关系，当一个对象状态发生改变时，所有依赖与它的对象都将会得到通知。


例如：以前在报刊订阅报纸，当你订阅了一份报纸，每当报社更新报纸时，都会发一份最新的给你，订阅报纸的人很多，但都是同一个报社，这就是 “一对多” 的关系

- 看代码怎么写
```js
function Dep() {
  // 一个集合，存所有订阅者的信息
  this.subs = []
}

Dep.prototype.add = function (sub) {
  // 添加订阅，并且订阅者要有 update 方法，当发布通知时，会调用订阅者的 update 方法
  if (sub && sub.update) {
    this.subs.push(sub)
  }
}

// 发布更新通知，通知所有的订阅者
Dep.prototype.notify = function () {
  this.subs.forEach(sub => {
    sub.update()
  })
}

function Watcher () {
  this.update = function() {
    console.log('run update')
  }
}

const dep1 = new Dep
const watch1 = new Watcher

dep1.add(watch1)
dep1.notify()
```