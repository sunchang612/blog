# Promise

## 基本使用
```js
const p = new Promise((resolve, reject) => {
  
})
p.then(() => {}, (err) => {} )
```
### state promise 状态
- pending 等待状态
- fulfilled 成功
- rejected 失败

> pending 可以转换为 fulfilled 或 rejected，但 fulfilled 和 rejected 不可相互转换

### then
- 第一个函数是成功的回调，第二个函数是失败的回调

### 链式调用
- 每一个 then 方法都会返回一个新的 promise 实例，从而让 then 支持链式调用，并可以通过返回值将参数传递给下一个 then
```js
p.then(function(num){
    return num
},function(num){
    return num
}).then(function(num){
    console.log('大于0.5的数字：', num)
},function(num){
    console.log('小于等于0.5的数字', num)
})
```

### catch 
- 直接获取失败的回调， 也支持上一个 then 发生的错误

### Promise.all 
- 处理多个 Promise
- 将多个 Promise 实例包装成一个 Promise 实例
```js
let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then(funciton(){
  // 三个都成功则成功  
}, function(){
  // 只要有失败，则失败 
})
```
- 组合后和普通的实例一样，有三种状态，三个都要成功，才返回成功，如果有一个失败，就是失败状态

### Promise.race 
- 与 all 方法类似，它是将多个 promise 实例包装成一个新的 Promise 实例
- 不同的是，All 是大Promise（返回的Promise）的状态是由多个小 Promise 决定，而 race 是由第一个转变状态的 小Promise的状态决定，第一个是成功则成功，第一个是失败则失败

### Promise 的局限性
1. 立即执行
- 当一个 Promise 实例被创建时，内部代码就会立即被执行，而且无法从外部停止。
2. 单次执行
- Promise 处理的问题都是“一次性”的，因为一个 Promise 实例只能 resolve 或 reject 一次，所以面对某些需要持续响应的场景时就会变得力不从心。比如上传文件获取进度时，默认采用的就是通过事件监听的方式来实现。

### 手写 Promise
- Promise/A+ 的规范
Promise 是一个对象或函数，对外提供了一个 then 函数，内部拥有3个状态
#### then 函数
then 函数接收两个函数作为可选参数：
```js
promise.then(onFulfilled, onRejected)
```
同时遵循下面几个规则：
  - 如果可选参数不为函数时应该被忽略；
  - 两个函数都应该是异步执行的，即放入事件队列等待下一轮 tick，而非立即执行；
  - 当调用 onFulfilled 函数时，会将当前 Promise 的值作为参数传入；
  - 当调用 onRejected 函数时，会将当前 Promise 的失败原因作为参数传入；
  - then 函数的返回值为 Promise。

#### Promise 状态
Promise 的 3 个状态分别为 pending、fulfilled 和 rejected。
- pending：“等待”状态，可以转移到 fulfilled 或者 rejected
- fulfilled：“执行”状态，是 Promise 的最终状态，表示执行成功，该状态下不可在改变
- rejected：“拒接”状态，是 Promise 的最终状态，表示执行失败，该状态不可在改变

#### Promise 解决过程
Promise 解决过程是一个抽象的操作，即接收一个 promise 和一个值 x，目的就是对 Promise 形式的执行结果进行统一处理。需要考虑以下几种情况。
- 1：x 等于 promise
抛出一个 TypeError 错误，拒绝 promise。

- 2： x 为 Promise 的实例
如果 x 处于等待状态，那么 promise 继续等待至 x 执行或拒绝，否则根据 x 的状态执行或拒绝promise

- 3：x 为对象或函数
这种情况下核心是取出 x.then 并调用，在调用的时候将 this 指向 x。将 then 回调函数中得到结果 y 传入新的 Promise 解决过程中，形成一个递归调用。如果执行报错，则这个错误为拒绝 promise 的原因。
这一步是处理拥有 then() 函数的对象或函数，这类对象或函数称之为“thenable”。注意：只是拥有 then() 函数，并不是 Promise 实例。

- 4：如果 x 不为对象或函数
以 x 作为值，执行 promise。

#### 实现 promise 简单版
```js
class MyPromise {
  constructor(fn) {
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    
    this.state = 'PENDING';
    this.value = '';
    
    fn(this.resolve.bind(this), this.reject.bind(this));
    
  }
  
  resolve(value) {
    if (this.state === 'PENDING') {
      this.state = 'RESOLVED';
      this.value = value;
      
      this.resolvedCallbacks.map(cb => cb(value));   
    }
  }
  
  reject(value) {
    if (this.state === 'PENDING') {
      this.state = 'REJECTED';
      this.value = value;
      
      this.rejectedCallbacks.map(cb => cb(value));
    }
  }
  
  then(onFulfilled, onRejected) {
    if (this.state === 'PENDING') {
      this.resolvedCallbacks.push(onFulfilled);
      this.rejectedCallbacks.push(onRejected);
      
    }
    
    if (this.state === 'RESOLVED') {
      onFulfilled(this.value);
    }
    
    if (this.state === 'REJECTED') {
      onRejected(this.value);
    }
  }
}
```
- 另一种写法
```js
function Promise(fn) {
  this.cbs = [];

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  }

  fn(resolve);
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};
```
#### 实现 Promise
```js
// 三种状态
let PENDING = 'pending'
let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'

function MyPromise(exec) {
  // 初始化属性
  this.onRejectedFn = []
  this.onFulfilledFn = []
  this.state = PENDING
  
  const resoleve = (value) => {
    // 使用 setTimeout 模拟异步调用
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onFulfilledFn.forEach((f) => {
          f(this.value)
        })
      }
    })
    
  }
  const reject = (error) => {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.error = error
        this.onRejectedFn.forEach((f) => {
          f(this.error)
        })
      }
    })
  }

  try {
    exec(resoleve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected){
  // 根据 1 原则，如果可选参数不为函数时可以被忽略
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (x) { return x }
  onRejected = typeof onRejected === 'function' ? onRejected : function (x) { throw e }
  // this.onFulfilledFn = []
  // this.onRejectedFn = []
  let promise
  console.log('state ---->', this)
  // 根据 2 规则，传入的回调函数时异步执行的，这里需要模拟异步用 setTimeout 模拟（但 setTimeout 是宏任务，这里其实是微任务）
  // 根据 3/4 promise 的状态执行 onFulfilled 或 onRejected
  switch(this.state) {
    case FULFILLED:
      // 根据 5 规则，then 被调用时应该返回一个新的 Promise，
      promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      break
    case REJECTED:
      promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.error)
            resolvePromise(promise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      break
    case PENDING:
      // 同时支持链式调用，在链式调用的情况下，如果 Promise 处于等待状态，那么需要保存多个 resolve 或 reject 函数，所以 onFulfilledFn 和 onRejectedFn 应该是数组 
      promise = new MyPromise((resolve, reject) => {
        this.onFulfilledFn.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedFn.push(() => {
          try {
            const x = onRejected(this.error)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      break
  }
  return promise
}

function resolvePromise(promise, x, resolve, reject) {
  // 第一种情况 promise 和 x 相等 抛出错误
  if (promise === x) {
    return reject(new TypeError('x 不能与 promise 相等'))
  }
  // 根据第二种情况判断
  if (x instanceof MyPromise) {
    if (x.state === FULFILLED) {
      resolve(x.value)
    } else if (x.state === REJECTED) {
      reject(x.error)
    } else {
      x.then((y) => {
        resolvePromise(promise, y, resolve, reject)
      }, reject)
    }
  } else if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    // 情况 3，将 x.then 取出然后执行，并将执行结果放入解决过程函数 resolvePromise() 中。 考虑到 x 可能只是一个 thenable 而非真正的 Promise，所以在调用 then() 函数的时候要设置一个变量 excuted 避免重复调用。同时记得在执行时添加异常捕获并及时拒绝当前 promise。
    let excuted
    try {
      if (typeof x.then === 'function') {
        x.then.call(x, (y) => {
          if (excuted) return
          excuted = true
          return resolvePromise(promise, y, resolve, reject)
        }, (e) => {
          if (excuted) return
          excuted = true
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (excuted) return
      excuted = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

new MyPromise((resolve,reject) => {
  console.log(1)
  resolve(2)
}).then((v) => {
  console.log('v --->', v)
  return v + 1
}).then((a) => {
  return a + 1
}).then((c) => {
  console.log(c)
})
```