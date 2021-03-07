# JavaScript 事件循环 宏任务微任务
### JavaScript 的执行机制
- <font color="red"> js 是单线程的</font>，js 任务需要一个一个执行，如果某一个任务过长，那么后面的任务就必须等着，但当我们打开一个网页时，有很多超级清楚的图片，那不就卡着一直显示不出来吗，因为可以将任务分为两类：
- 异步任务
- 同步任务

### 什么是事件循环
1. 让同步任务和异步任务分别进入不同的执行”场所“，同步的进入主线程，异步的进入 Event table 并注册函数。
2. 当指定的事情完成时，Event table 会将整个函数移入 Event Queue (队列)
3. 主线程内的任务执行完毕为空后，会去 Event Queue 读取对应的函数，进行主线程执行。
4. 上面的过程不断的重复，也就是我们常说的 Event Loop 事件循环。

### 怎么知道主线程执行栈为空？
js 引擎存在 monitoring process 进程，会持续不断检查主线程执行栈是否为空，一旦是空，就会去 Event Queue 那里检查是否有等待被调用的函数。

### ajax
```js
let data = [];
$.ajax({
  url:www.javascript.com,
  data:data,
  success:() => {
    console.log('发送成功!');
  }
})
console.log('代码执行结束');
```
- ajax 进入 Event table，注册回调函数 success 
- 执行 console
- ajax 事件完成，回调函数 success 进入 Event Queue
- 主线程从 Event Queue 读取回调函数 success 执行。

### setTimeout
- 定时器
```js
setTimeout(() => {
  console.log('123')
}, 1000)
console.log('console')
```
- 延迟一秒执行
```但是```有些时候，当前一个任务还没执行完，而 设置的延迟时间已经到了，并没有执行。
setTimeout(fn, 0) 这样并不会在 0 毫秒之后执行，主线程任务空闲时，不用再等多少秒执行，但写 0 没有意义，根据不同的浏览器，默认的时间是不一样的。

 - Promise 与 process.nextTick(callback)
process.nextTick(callback)类似node.js版的"setTimeout"，在事件循环的下一次循环中调用 callback 回调函数。

- macro-task 宏任务： 包括整体代码 script， setTimeout， setInterval
- micro-task 微任务： promise，process.nextTick

事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。
```js
setTimeout(function() {
  console.log('setTimeout');
})

new Promise(function(resolve) {
  console.log('promise');
  resolve() // 如果这里不写的话，是不会执行 then 方法
}).then(function() {
  console.log('then');
})

console.log('console');
```
- 这个代码作为宏任务，进入主线程
- 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)
- 接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue。
- 遇到console.log()，立即执行。
- 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行。
- ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行。
- 结束。
结果：
```js
promise
console
then
setTimeout
```

```js
console.log('1');

setTimeout(function() {
  console.log('2');
  process.nextTick(function() {
    console.log('3');
  })
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('5')
  })
})
process.nextTick(function() {
  console.log('6');
})
new Promise(function(resolve) {
  console.log('7');
  resolve();
}).then(function() {
  console.log('8')
})

setTimeout(function() {
  console.log('9');
  process.nextTick(function() {
    console.log('10');
  })
  new Promise(function(resolve) {
    console.log('11');
    resolve();
  }).then(function() {
    console.log('12')
  })
})

```
1. 代码作为第一个宏任务进入主线程，执行 console
2. 遇到 setTimeout 把他的回调函数分发到宏任务 Event Queue 为 setTimeout1
3. process.nextTick，函数分发到 Event Queue 中，记录 process1
4. Promise 直接执行，输出7，then 被分发到微任务中，记录为 then1
5. 又遇到 setTimeout，把他的回调函数分发到宏任务 Event Queue 为 setTimeout2

> 此时，已经有 宏任务 setTimeout1， setTimeout2， 微任务 process1 then1
6. 发现有两个微任务，执行这两个微任务 process1 then1
> 此时，第一轮事件循环结束
7. 第二轮从 setTimeout1 宏任务开始：输出 console，将 rocess.nextTick()，同样将其分发到微任务Event Queue中，记为process2。new Promise立即执行输出4，then也分发到微任务Event Queue中，记为then2。
> 此时有 宏任务 setTimeout2，和 微任务 process2 then2 未执行。
8. 执行这两个微任务 process2 then2
> 此时 ，第二轮结束
9. 第三轮开始，执行宏任务 setTimeout2 ，它有两个微任务 将process.nextTick()分发到微任务Event Queue中。记为process3。将then分发到微任务Event Queue中，记为then3。
10. 执行这两个微任务，结束。

### 浏览器和Node事件循环的区别
- 微任务和宏任务在Node的执行顺序
- Node 10以前：
执行完一个阶段的所有任务
执行完nextTick队列里面的内容
然后执行完微任务队列的内容
- Node 11以后：
<font color="red">Node和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。</font>

- js的异步
我们从最开头就说javascript是一门单线程语言，不管是什么新框架新语法糖实现的所谓异步，<font color="red">其实都是用同步的方法去模拟的，牢牢把握住单线程这点非常重要。</font>
