# JavaScript 变量提升的变态机制
- JavaScript 代码自上而下执行之前，浏览器首先会把所有带 var / function 关键字开头的进行提前声明或者定义，这种预先处理机制称为“变量提升”。

## 几种机制
1. <font color="red"> 不管条件是否成立，都要把带 var 的进行提前声明 </font>
```js
  console.log(e) // undefined
  var d = 1
  if (d > 2) {
    var e = 'e'
  }
```

2. 只会提升 “=” 左边的，右边是值，不参与
- 虽然 fn 返回的一个函数，但在变量提升时，fn() 是 undefined() 所以会报错

```js
  fn() // fn is not a function
  var fn = function () {
    var 
    console.log('Hello World')
  }
  fn()
```
- 这种方式叫匿名函数之函数表达式，把函数定义的部分当做一个值赋值给变量或者元素的某个事件。

3. 执行函数定义的那个 function 在全局作用域下不进行变量提升，当代码执行到那个位置时定义和执行一起完成
  - 自执行函数定义和执行也是一起完成
- 正常函数变量提升
```js
  foo()
  function foo() {
    console.log('Hello World' + a) // Hello Worldundefined
    var a = '123'
  }
```
- 自执行函数
  - 全局作用域下，没有变量提升
```js
  
  void function foo() {
    console.log('Hello World' + a)
    var a = '123'
  }()
```
4. 函数体中 return 下面的代码都是返回值，分情况有可能需要”变量提升“
- 直接执行 
```js
  function fn () {
    console.log('Hello World' + a) //  a is not defined
    return function() {
      var a = '123'
    }
  }
  fn()
```
- 执行后赋值给一个变量
```js
  function fn () {
    console.log('Hello World' + a) // Hello Worldundefined
    return function() {
      // console.log('Hello World 123' + a)
      var a = '123'
    }
  }
  var f = fn()
```

- 让返回结果执行
```js
  function fn () {
    console.log('Hello World' + a)
    // var a = '你好'
    return function() {
      console.log('return Hello World' + a)
      var a = '123'
    }
  }
  var a = fn() // Hello Worldundefined
  a() //return Hello Worldundefined
```

- 因为这就牵扯到作用域的不同，会引入一道很经典的面试题，例如：
```js
function fn () {
  console.log(a + 'World')
  var a = '你好'
  return function() {
    var a = '123'
    console.log('Hello' + a)
  }
}
var a = fn()()
```

5. 在”变量提升“的时候，如果名字已经声明过了，不需要重新声明，但可以重新赋值
- 例如：
```js
 function fn () {
    var a = '你好'
    console.log(a + 'World') // 你好World
  }
  fn()

  var fn = 10
  console.log(fn) // 10
```
