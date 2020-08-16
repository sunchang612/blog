## Promise
```js
const p = new Promise((resolve, reject) => {
  
})
p.then(() => {}, (err) => {} )
```
#### state promise 状态
- pending 等待状态
- fulfilled 成功
- rejected 失败

> pending 可以转换为 fulfilled 或 rejected，但 fulfilled 和 rejected 不可相互转换

#### then
- 第一个函数是成功的回调，第二个函数是失败的回调

#### 链式调用
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

#### catch 
- 直接获取失败的回调， 也支持上一个 then 发生的错误

#### Promise.all 
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

#### Promise.race 
- 与 all 方法类似，它是将多个 promise 实例包装成一个新的 Promise 实例
- 不同的是，All 是大Promise（返回的Promise）的状态是由多个小 Promise 决定，而 race 是由第一个转变状态的 小Promise的状态决定，第一个是成功则成功，第一个是失败则失败
