## 学习 Vue 中观察者模式

```JS
// 发布者-目标
class Dep {
  constructor() {
    // 记录所有的订阅者
    this.subs = []
  }
  // 添加订阅者
  addSub(sub) {
    // 判断订阅者是否存在，并且有update 方法
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发布通知
  notify() {
    // 循环发布通知
    this.subs.forEach(s => {
      s.update()
    })
  }
}

// 订阅者-观察者
class Watcher {
  update() {
    console.log('update --->')
  }
}

let dep = new Dep
let watcher = new Watcher
// 添加订阅者
dep.addSub(watcher)
// 发布执行
dep.notify()

// 执行结果 update --->
```
### 观察者模式和订阅发布模式的区别
- 观察者模式是由具体的目标调用，例如：当事件触发 Dep 就会去调用观察者的方法，所以订阅者和观察者之间是存在依赖的。
- 发布订阅模式是由统一的调度中心调用，因为发布者和订阅者不需要知道对方的存在。
