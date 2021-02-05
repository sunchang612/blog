# call、apply、bind

## 基本使用
apply、call、bind
都是Function 对象上的方法，调用这三个方法必须是一个函数。

- 使用
```js
fn.call(thisArg, param1, ... paramN)
fn.apply(thisArg, [param1, ... paramN])
fn.bind(thisArg, param1, ... paramN)
```
fn 是要调用的函数
thisArg 是 this 所指向的对象
param 是参数

- 相同点： 都是改变函数的 this 指向。
- 不同点：
    - call 和 apply 的区别在于传参：apply 第二个参数是数组，call 则是从第二个至第 N 个都是给函数的 fn 的参数。
    - bind 和它俩的不同，bind 虽然也是改变了函数的 this 指向，但是不是马上执行，而另外两个是改变函数的 this 指向后立即执行。

- 主要使用
  - 案例：A 对象有个 getName 方法，B 也要临时使用这样的方法，那么我们就不需要在从 B 那里扩展一个新的方法，可以借用 A 对象的 getName 方法，即达到了目的，又节省了内存空间。
```js
  let A = {
    name: 'A',
    getName: function (msg) {
      return msg + this.name
    }
  }

  let B = {
    name: 'B'
  }
  console.log('call ->', A.getName.call(B, 'Hello ')) // call -> Hello B
  console.log('apply ->', A.getName.apply(B, ['Hello '])) // apply -> Hello B
  const getName = A.getName.bind(B, 'Hello ')
  console.log('bind ->', getName()) // bind -> Hello B
```

## 手写 call
- call 的功能就是改变 this 指向，并指向函数，如果有参数将参数传入
```js
Function.prototype.myCall = function(context, ...args) {
  const ctx = context || window
  ctx.fn = this
  const result = eval('ctx.fn(...args)')
  delete ctx.fn
  return result
}

// 测试
 console.log('myCall --->', A.getName.myCall(B, 'Hello ')) // myCall ---> Hello B
```

## 手写 apply
- 原理和 call 类似，知识传参有所改变
```js
Function.prototype.myApply = function (context, args) {
  const ctx = context || window
  ctx.fn = this
  const res = eval('context.fn(...args)')
  delete ctx.fn
  return res
}
// 测试
console.log('myApply --->', A.getName.myApply(B, ['apply ']))
// myApply ---> apply B
```

## 手写 bind
- bind 和前面两个思路也差不太多，只是 bind 不能直接执行，需要返回一个函数，`注意：返回函数原型上的属性不能丢` 
```js
 Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') throw new Error('this must be a function')
  let self = this
  let res = function () {
    // 这里如果执行可能还会有参数，需要和之前的参数合并 Array.prototype.slice.call(arguments)
    return self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
  }
  // 如果原型上有方法
  if (this.prototype) {
    res.prototype = Object.create(this.prototype)
  }
  return res
}

// 测试
const mbind = A.getName.myBind(B, 'my bind ')
console.log('my bind-->', mbind()) // my bind--> my bind B
```