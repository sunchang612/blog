# JavaScript 代码题目

## 实现一个 sleep 函数
- 比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现

```js
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}

function output(){
  console.log(1);
}
sleep(output,1000);
```

## 输出一下代码的执行结果并解释为什么(考察. 和赋值的优先级)
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x) 	
console.log(b.x)
```
- 先看答案
```js
undefined
{n: 2}
```

#### 解释
1. a 赋值，a 指向堆内存 {n: 1}
```js
a = {n: 1};
```
2. b 赋值，b = a 也是指向堆内存 {n: 1}
```
b = a
```
3. \. 的优先级大于 = ，所以优先赋值。
- 此时 a.x 已绑定到了 {n: 1, x: undefined}
```js
a.x // x 不选在，a.x 就是 undefined
a --> {n: 1}
b --> {n: 1} 
```
4. 同等级赋值运算从右向左，a 改变堆内存地址，a = {n: 2}
```js
a.x = a = {n: 2}
```
5. 因为 a.x 已经绑定到了 {n: 1, x: undefined}，这个内存地址，所以就相当于
```js
{n: 1, x: undefined}.x = {n: 2}
```
- 所以结果
```js
a = {n: 2}
b = {
  n: 1,
  x: {
    n: 2
  }
}
```
## 输出以下代码执行的结果并解释为什么 (考察 splice length 等)
```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```
- 输入结果
```js
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```

#### 涉及的知识点
- 类数组 （ArrayLike）
  - 一组数据用数组来存，如果对这个数据进行扩展，会影响到数组原型，类数组则提供了一个中间数据桥梁，<font color="red">类数组有数组的特性，但对类数组扩展不会影响到原生的数组</font>

- push 方法（往数组末尾添加数据）
  - push 具有通用性，可以和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。<font color="red">push 方法根据 length 属性来决定从哪开始插入给定的值</font>. 如果 length 不能被转成一个数值，则插入的元素索引为 0 ，同样也包括length 不存在时，当 length 不存在，将会创建它.

- 对象转数组的方式：
  - Array.from()、splice() 、 concat 等

#### 分析题目
- 题目中 obj 中定义了两个 key 值，分别是 splice 和 push 方法，对应了数组中的splice 和 push 这两个方法，因此obj 可以调用数组中的 push 和 splice。
- 调用对象的 push(1), 因为此时的 obj length 是 2，所以从数组中的第二项开始插入（也就是第三个，因为 索引 从 0 开始的），此时已经定义了 key 是2,3这两项，所以会替代 2 的值，第一次push 完，此时 key 2 的值是 1
- 同理，调用第二次 push key 为 3 的值是 2。
- 最后输出结果 
```
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```
##### 为什么前两项的值是 empty
- 因为只定义了 2 和 3 项，没有 0 和 1 ，所以是 empty

## 使用 sort 对数组排序
- sort 函数，可以接收一个函数，返回值是比较两个数的相对顺序值
#### 默认没有函数 是按照 UTF-16 排序，对于字母数字可以利用 ASCII 进行记忆
```
 [3, 15, 8, 29, 102, 22].sort();

// [102, 15, 22, 29, 3, 8]
```
#### 带函数的比较
```
 [3, 15, 8, 29, 102, 22].sort((a, b) => a - b );
// [3, 8, 15, 22, 29, 102]
```
- 返回值大于 0 即 a-b > 0 , ab 交换位置
- 返回值小于 0 即 a-b < 0 , ab 交换位置
- 返回值等于 0 即 a=b, ab 位置不变
> 对于函数返回 a-b 可以类比上面的返回值进行交换位置

## 下面代码输出什么 (考察自执行函数)
```js
var a = 10;
(function () {
  console.log(a)
  a = 5
  console.log(window.a)
  var a = 20;
  console.log(a)
})()

undefined
10
20
```

## 改造下面的代码，使之输出0 - 9
```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
  }, 1000)
}
```
- 两种常见的思路：
  1. var 改成 let，但不会每个一秒才打印一个
  ```js
    for (let i = 0; i< 10; i++){
      setTimeout(() => {
        console.log(i);
      }, 1000)
    }
  ```
  2. 使用匿名函数的方式，增加作用域，也不会每秒打印一次
  ```js
  for (var i = 0; i< 10; i++){
    ((i) => {
      setTimeout(() => {
        console.log(i);
      }, 1000)
    })(i)
  }
  ```

## 下面的代码打印什么内容，为什么？(考察函数表达式与匿名函数)
```js
var b = 10;
(function b(){
  b = 20;
  console.log(b); 
})();
```
- 打印
```js
b(){
  b = 20;
  console.log(b); 
}
```
- <font color="#0000FF">上面function用括号括起来了，说明这是一个函数表达式，而不是一个函数声明。括号可以改变运算符的优先级，在这里它是一个分组符。</font>

- <font color="#f28500"> 具名函数表达式中的函数名在函数内部是可以访问的，但函数外面是无法访问到的，</font>这点和函数声明有很大的不同。没有括号的话，全局变量是可以访问到b的。至于函数里面的b是全局变量自然不必细说。因此，console.log里面的b肯定现在函数内部找，然后再在全局找，所有b就是funcition b{} 
> <font color="red"> 因为 function 里面的 b 是全局的变量，如果 b 加上 var 那么打印的就是 20 </font>

## 下面代码 a 在什么情况下会打印 1？
```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```
- <font color="red"> 因为 == 会做隐式转换，所以只要重写 a  的 toString 方法即可 </font>
```js
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}

if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}
```

## 改造下面的代码，使之输出0 - 9
```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
  }, 1000)
}
```
- 两种常见的思路：
  1. var 改成 let，但不会每个一秒才打印一个
  ```js
    for (let i = 0; i< 10; i++){
      setTimeout(() => {
        console.log(i);
      }, 1000)
    }
  ```
  2. 使用匿名函数的方式，增加作用域，也不会每秒打印一次
  ```js
  for (var i = 0; i< 10; i++){
    ((i) => {
      setTimeout(() => {
        console.log(i);
      }, 1000)
    })(i)
  }
  ```


## 简单改造下面的代码，使之分别打印 10 和 20
```js
var b = 10;
(function b(){
	b = 20;
	console.log(b); 
})();
```
- 答案
```js
var b = 10;
(function b(b){
  b = 20;
  console.log(b); 
})(b);
console.log(b);

var b = 10;
(function b(b){
	console.log(b);
	b = 20;
	console.log(b);
})(b);
```

## 防抖 和 节流 
#### 防抖
- 触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
- 每次触发时间都会取消之前的延时调用方法
```js
function debounce(fn) {
  let timer = null // 存放定时器的变量
  return () => {
    clearTimeout(timer) // 每次先清除定时器
    timer = setTimeout(() => { // 时间间隔内，多次点击都会从新计时，不会去执行 fn 函数
      fn.apply(this, arguments)
    }, 500)
  }
}
```

#### 节流
- 高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率
- 每次触发事件时都判断当前 是否有等待执行的延迟函数
```js
function throttle(fn) {
  let isRun = false
  return () => {
    if (isRun) return // 判断是否在函数运行中，是的话，直接 return
    isRun = true
    setTimeout(() => {
      fn.apply(this, arguments)
      // 执行完成后设置为 false ，意思是可以进行下一次执行了，当前执行已结束
      isRun = false
    })
  }
}
```

## 如何实现一个 new 
```js
function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  return ret instanceof Object ? ret : obj;
}
```

## 下面代码输出什么（考察 window 和 匿名函数、变量提升）
```js
var a = 10;
(function () {
  console.log(a)
  a = 5
  console.log(window.a)
  var a = 20;
  console.log(a)
})()

undefined
10
20
```


## 使用 sort 对数组排序
- sort 函数，可以接收一个函数，返回值是比较两个数的相对顺序值
#### 默认没有函数 是按照<font color="red"> UTF-16 排序</font>，对于字母数字可以利用 ASCII 进行记忆
```js
 [3, 15, 8, 29, 102, 22].sort();

// [102, 15, 22, 29, 3, 8]
```
#### 带函数的比较
```js
 [3, 15, 8, 29, 102, 22].sort((a, b) => a - b );
// [3, 8, 15, 22, 29, 102]
```
- 返回值大于 0 即 a-b > 0 , ab 交换位置
- 返回值小于 0 即 a-b < 0 , ab 交换位置
- 返回值等于 0 即 a=b, ab 位置不变
> 对于函数返回 a-b 可以类比上面的返回值进行交换位置


## 输出以下代码执行的结果并解释为什么 (考察 splice length 等)
```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```
- 输入结果
```js
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```

#### 涉及的知识点
- 类数组 （ArrayLike）
  - 一组数据用数组来存，如果对这个数据进行扩展，会影响到数组原型，类数组则提供了一个中间数据桥梁，<font color="red">类数组有数组的特性，但对类数组扩展不会影响到原生的数组</font>

- push 方法（往数组末尾添加数据）
  - push 具有通用性，可以和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。<font color="red">push 方法根据 length 属性来决定从哪开始插入给定的值</font>. 如果 length 不能被转成一个数值，则插入的元素索引为 0 ，同样也包括length 不存在时，当 length 不存在，将会创建它.

- 对象转数组的方式：
  - Array.from()、splice() 、 concat 等

#### 分析题目
- 题目中 obj 中定义了两个 key 值，分别是 splice 和 push 方法，对应了数组中的splice 和 push 这两个方法，因此obj 可以调用数组中的 push 和 splice。
- 调用对象的 push(1), 因为此时的 obj length 是 2，所以从数组中的第二项开始插入（也就是第三个，因为 索引 从 0 开始的），此时已经定义了 key 是2,3这两项，所以会替代 2 的值，第一次push 完，此时 key 2 的值是 1
- 同理，调用第二次 push key 为 3 的值是 2。
- 最后输出结果 
```
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```
##### 为什么前两项的值是 empty
- 因为只定义了 2 和 3 项，没有 0 和 1 ，所以是 empty


## 实现 (5).add(3).minus(2) 功能
- 实现就是在 Number 原型上增加这两个方法
#### 简单版
```js
Number.prototype.add = function(n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};
console.log((5).add(3).minus(2));
```
#### 稍微严谨一些
```js
Number.prototype.add = function (value) {
  let  number = parseFloat(value);
  if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error('请输入数字或者数字字符串～');
  };
  return this + number;
};
Number.prototype.minus = function (value) {
  let  number = parseFloat(value);
  if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error('请输入数字或者数字字符串～');
  }
  return this - number;
};
console.log((5).add(3).minus(2));
```

> 但是，如果是计算小数的话，是 js 天生的劣势，它有浮点数陷阱，如果是要考虑这些的话，实现的代码就会相对复杂很多.

#### 相对严谨的写法
```js
Number.MAX_SAFE_DIGITS = Number.MAX_SAFE_INTEGER.toString().length-2
Number.prototype.digits = function(){
	let result = (this.valueOf().toString().split('.')[1] || '').length
	return result > Number.MAX_SAFE_DIGITS ? Number.MAX_SAFE_DIGITS : result
}
Number.prototype.add = function(i=0){
	if (typeof i !== 'number') {
    throw new Error('请输入正确的数字');
  }
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum + i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
Number.prototype.minus = function(i=0){
	if (typeof i !== 'number') {
    throw new Error('请输入正确的数字');
  }
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum - i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
```

## 输出一下代码的执行结果并解释为什么 （考察等号的优先级）
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x) 	
console.log(b.x)
```
- 先看答案
```js
undefined
{n: 2}
```

#### 解释
1. a 赋值，a 指向堆内存 {n: 1}
```js
a = {n: 1};
```
2. b 赋值，b = a 也是指向堆内存 {n: 1}
```
b = a
```
3. \. 的优先级大于 = ，所以优先赋值。
- 此时 a.x 已绑定到了 {n: 1, x: undefined}
```js
a.x // x 不选在，a.x 就是 undefined
a --> {n: 1}
b --> {n: 1} 
```
4. 同等级赋值运算从右向左，a 改变堆内存地址，a = {n: 2}
```js
a.x = a = {n: 2}
```
5. 因为 a.x 已经绑定到了 {n: 1, x: undefined}，这个内存地址，所以就相当于
```js
{n: 1, x: undefined}.x = {n: 2}
```
- 所以结果
```js
a = {n: 2}
b = {
  n: 1,
  x: {
    n: 2
  }
}
```

## a.b.c.d 和 a['b']['c']['d']，哪个性能更高？
- a.b.c.d 比 a['b']['c']['d'] 性能高点，因为[ ]里面有可能是字符串，有可能是变量，至少多一次判断，而a.b.c.d是直接取用该字符串当作属性名的，但实际结果两者性能差距不大，非常小基本上可以忽略不计。

## 写出如下代码的打印结果 （考察new和参数相关知识）
```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```
- 答案是 "http://www.baidu.com"
#### 解释
- 对象作为参数，传递给函数的是这个对象的引用地址， o.siteUrl 是个这个对象赋值， o = new Object; 是把 o 指向另一个对象，o.siteUrl 是给这个新的对象赋值，不影响 webSite 这个变量指向的那个地址，因为两个o 指向的对象的引用地址是不同的。

## 请写出如下代码的打印结果 (考察原型及函数执行)
```js
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```
- 执行结果 4，2，1
#### 解释
```js
// Foo 方法定义，没有产生实例，所以并没有执行
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}

// 在 Foo 原型上挂载了 a 方法，输出 3
Foo.prototype.a = function() {
  console.log(3)
}

// 在 Foo 方法上直接挂载了 a ，输出 4
Foo.a = function() {
  console.log(4)
}

// 立即执行了 Foo 上 a 方法，也就是上一步刚定义的 所以，输出 4
Foo.a();
// 创建 Foo 的实例 obj 
let obj = new Foo();
// 直接调用 obj.a 的方法，这里调用的是私有方法，如果私有没有才会调用  property 上的方法，所以输出 2
obj.a();
// 这时在调用 Foo.a 上面创建实例时，已经替换了全局 Foo 上的 a 方法，所以输出 1
Foo.a();
```

## 实现延迟打印数组 [1,2,3,4,5]，每一次打印的初始延迟为 1000ms，增长延迟为 500ms。
- 打印结果如下：
```
0s:    1
1s:    2
2.5s:  3
4.5s:  4
7s:    5
```
- 代码
```js
const arr = [1,2,3,4,5]
arr.reduce(async(pre, cur, index) => {
  await pre
  const time = index === 0 ? 0 : 1000 + (index - 1) * 500
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(cur)
      resolve(time)
    }, time)
  })
}, Promise.resolve(0))
```