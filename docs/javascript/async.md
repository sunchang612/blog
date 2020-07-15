# async/await 如何通过同步的方法实现异步
- 是一种语法糖，基于 Generator 函数和自执行器实现

### generator 函数
- Generator 函数是一种状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，可以依次遍历Generator 函数内部的每一个状态，但是只有调用 next 方法才会遍历下一个内容状态，所以其实提供了一种可以暂停执行的函数，yield 表达式就是暂停标志。

```js
function* testGenerator() {
  yield 'hello';
  yield 'world';
  yield 'test';
}

var t = testGenerator()
```
```js
t.next()
{value: "hello", done: false}
t.next()
{value: "world", done: false}
t.next()
{value: "test", done: false}
t.next()
{value: undefined, done: true}
t.next()
{value: undefined, done: true}
```
- 从结果可以看出，Generator 函数被调用并不会执行，但还有调用了 next 方法、内部指针指向该语句才会执行，即”函数可以暂停，也可以恢复执行“。每次调用遍历器对象的 next 方法，就会返回一个有着 ”value“ 和 done 两个属性的对象。value 属性表示当前的内部状态值，是 yield 表达式后面那个表达式的值; done 属性是一个布尔值，表示是否遍历结束。

### Generator 函数暂停恢复执行原理
- 先了解一下协程的概念。
> 一个线程或函数执行到一半，可以暂停执行，将执行权交给另一个线程或函数，当到稍后收回执行权的时候，在恢复执行。这样可以并行执行，交换执行权的线程或函数，就称为协程。

- 协程是一个比线程更加轻量级的存在。普通线程是抢先式的，会争夺 CPU 资源，而协程是合作的，可以把协程看成是跑在线程上的任务，一个线程可以存在多个协程，但是在线程上同时只能执行一个协程。运行流程大致如下：
1. 协程 A 开始执行
2. 协程A执行到某个阶段，进入暂停，执行权转移到协程B
3. 协程B执行完成或暂停，将执行权交还A
4. 协程A恢复执行
- 协程遇到 yield 命令就会暂停，等到执行权返回，再从暂停的地方继续往后执行。它最大的优点，就是代码的写法非常像同步操作。

### 执行器
- 通常把执行器代码封装成一个函数，并把这个执行生成器代码的函数称为执行器， 著名的就是 co 模块。

Generator 是一个异步操作的容器，它的自动执行需要一种机制，当异步操作有了结果，就能自动交回执行权。有两种方法可以做到这一点：
1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
2. Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

- 基于 Promise 对象的简单自动执行器：
```js
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}
```
使用
```js
function* foo() {
  let response1 = yield fetch('https://xxx') //返回promise对象
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('https://xxx') //返回promise对象
  console.log('response2')
  console.log(response2)
}
run(foo);
```
- 上面的代码中，<font color="red">只要 Generator 函数还没执行到最后一步，next 函数就会调用自身，以此实现自动执行。通过使用生成器配合执行器，就能实现使用同步的方式写出异步代码了，这样也大大加强了代码的可读性。</font>

### async await
- ES7 中引入了 async/await，这种方式能够彻底告别执行器和生成器，实现更加直观简洁的代码。根据 MDN 定义，<font color="red">async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。可以说async 是Generator函数的语法糖，并对Generator函数进行了改进。</font>
改造前面的代码，用 async 实现：
```js
const foo = async () => {
  let response1 = await fetch('https://xxx') 
  console.log('response1')
  console.log(response1)
  let response2 = await fetch('https://xxx') 
  console.log('response2')
  console.log(response2)
}
```
- 比较发现，async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await。
async 函数对 Generator 函数的改进，体现在下面几点：
1. 内置执行器。 Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next 方法。
2. 更好的语义。 async 和 await，相比于 * yield，语义更清楚了。async 表示函数里面有异步操作，await 表示紧跟在后面的表达式需要等待结果。
3. 更广的适用性。 co 模块约定，yield 命令后面只能是 thunk 函数或者 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值，字符串和布尔值，但这时会自动转成立即 resolve 的 Promise）
4. 返回值是 Promise 。 async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then 方法进行调用。

- 这里的重点是自带了执行器，相当于把我们要额外做的(写执行器/依赖co模块)都封装了在内部。比如：
```js
async function fn(args) {
  // ...
}
```
等同于：
```js
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) { //spawn函数就是自动执行器，跟简单版的思路是一样的，多了Promise和容错处理
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}

```

### async / await 执行顺序
- 通过上面的分析，async 隐式返回 Promise 作为结果的函数，那么简单理解为，<font color="red">await 后面的函数执行完毕时，await 会产生一个 微任务</font>。但是我们需要注意这个微任务执行的时机，<font color="red">它是执行完await之后，直接跳出 async 函数，执行其他代码（此处就是协程的运作，A暂停执行，控制权给 B）.其他代码执行完毕后，再回到 async 函数去执行剩下的代码，然后把 await后面的代码注册到微任务队列中。</font>

```js
console.log('script start')

async function async1() {
await async2()
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
}
async1()

setTimeout(function() {
console.log('setTimeout')
}, 0)

new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
})

console.log('script end')
script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
```
- 按照常理感觉应该是 
```js
script start
async2 end
async1 end
Promise
script end
promise1
promise2
setTimeout
```
- 但新版的 v8 规范修改以后，执行的结果发生了改变
- 如果 await 后面直接跟一个变量，await 1 相当于把 await 后面的代码注册了一个微任务（可以理解为 promise.then(await 下面的代码)）。然后跳出 async 函数，执行其他代码，当遇到 promise 函数时，先执行同步代码，然后会注册 promise.then标记为 then2 函数到微任务队列，此时  then2 在微任务 await 后面，所以执行完同步后，执行微任务会先执行 async1 end 然后再去执行 promise.then

#### 如果 await 后面跟的是一个异步函数的调用
```js
console.log('script start')

async function async1() {
await async2()
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
return Promise.resolve().then(()=>{
  console.log('async2 end1')
})
}
async1()

setTimeout(function() {
console.log('setTimeout')
}, 0)

new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
})

console.log('script end')
```
结果是：
```js
script start
async2 end
Promise
script end
async2 end1
promise1
promise2
async1 end
setTimeout
```
- 分析：
    - 此时 await 并不先把 await后面的代码注册到 微任务队列中去，而是执行完 await 后，直接跳出 async1 函数，执行其他同步代码，遇到 Promise 把 .then 注册为微任务，其它代码执行完后，”回到 async1 函数中去执行剩下的代码“（也就是 async2 返回的异步代码），然后再把 await 后面的代码注册到微任务队列中，但此时注意”前面已经注册了 微任务.then“所以会出现执行完 Promise.then 后，才会执行 async1 end。

## JS 异步解决方案的发展历程以及优缺点

### 1 回调函数 callback 
```js
  function test(cb) {
      cb()
  }
  function cb() {

  }
  test()
```
- 缺点：回调嵌套太多 容易引起回调地狱，不能用 try catch 捕获错误，不能 return

- 优点：解决了同步的问题

### Promise
- Promise 就是为了解决 callback 的问题而产生的。
- Promise 实现了链式调用，也就是每次 then 返回的都是一个全新的 promise，如果在 then 中 return ，return 的结果会被 promise.resolve 包装。
- 优点：解决了回调地狱的问题
```js
featch().then()
```
- 缺点： 无法取消 Promise，错误需要通过回调函数来捕获。

### Generator 
- 优点：可以控制函数执行，可以配合 co 函数库使用
```js
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

### async/await
- 异步的终极解决方案
- 优点：代码清晰，不用像 Promise 写一堆 then 链，处理了回调地狱的问题
- 缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。