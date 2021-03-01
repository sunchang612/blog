# js 手写深浅拷贝

## 浅拷贝
先说一下浅拷贝的实现方式
#### Object.assgin()
ES6 中 Object 的一方法，可以是来合并多个JS对象（能用来实现浅拷贝）
第一个参数拷贝的目标对象，后面的参数是拷贝的来源对象
- 语法
```
Object.assgin(target, ...sources)
```
> 注意：<font color='red'> Object.assgin 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。</font>
使用 Object.assign 方法注意以下几点：
- 不会拷贝对象的继承属性
- 不会拷贝对象的不可枚举属性
- 可以拷贝 Symbol 类型的属性

#### 扩展运算法
利用扩展运算法，可以实现浅拷贝的的功能。
- 拷贝对象
```js
  let obj = {a: 1, b: 2}
  let obj1 = {...obj}
  obj1.b = 3
  console.log(obj1)// {a: 1, b: 3}
  console.log(obj)// {a: 1, b: 2}
```
- 拷贝数组
```js
let arr = [1,2,3]
let arr1 = [...arr]
```

#### 拷贝数组
- 能利用原生的数组的方法实现浅拷贝的有好多个

- concat 拷贝数组
```js
  let arr = [1,2,3]
  let arr1 = arr.concat()
  arr1[0] = 5
  console.log(arr1) // [5, 2, 3]
  console.log(arr) // [1, 2, 3]
```
  
- slice 拷贝数组
```js
let arr = [1,2,3]
let arr2 = arr.slice()
arr2[2] = 4
console.log(arr2) //[1, 2, 4]
console.log(arr) // [1, 2, 3]
```

- Array.from 拷贝数组
```js
let arr = [1,2,3]
let arr4 = Array.from(arr)
arr4.push(1)
console.log('arr4', arr4) // [1,2,3,1]
console.log(arr) // [1,2,3]
```

#### 使用 JS 手动实现一个浅拷贝
手写浅拷贝的思路：
1. 基础类型做最基本的赋值就可。
2. 引用数据类型，需要开辟一个新的存储，并拷贝一层对象属性。
```js
function shallowCopy(target) {
  // 引用类型需要开辟一个新的存储地址
  if (typeof target === 'object' && target !== null) {
    const copy = Array.isArray(target) ? [] : {}
    for (const prop in target) {
      if (target.hasOwnProperty(prop)) {
        copy[prop] = target[prop]
      }
    }
    return copy
  }
  // 如果是基础类型就直接返回
  return target
}
```

## 深拷贝
将一个对象从内存中完整的拷贝出来给目标独对象，并新开辟一个全新的内存空间存放对象，新对象的修改并不会改变原对象，实现真正的分离。

#### JSON.stringify
最简单的深拷贝的方法，就是把一个对象序列化成为 JSON 的字符串，并将对象里面的内容转成字符串，最后用 JSON.parse() 将 JSON 字符串生成一个新的对象。
```js
const obj = {
  name: 'achang',
  age: 25,
  skills: {
    js: '深拷贝'
  }
}
const str = JSON.stringify(obj)
let obj2 = JSON.parse(str)

obj2.skills.js = '修改深拷贝'
console.log(obj2) // { age: 25, name: "achang", skills: { js: "修改深拷贝" }}
console.log(obj)// { age: 25, name: "achang", skills: { js: "深拷贝" }}
```
<font color='red'>但是</font> JSON.stringify 实现深拷贝有些地方需要注意：
1. 拷贝的对象的值如果有函数，undefined，symbol 这几种类型，经过 JSON.stringify 序列化后字符串中这个键值对会消失。
2. 拷贝 Date 类型会变成字符串
3. 无法拷贝不可枚举的属性
4. 无法拷贝对象原型链
5. 拷贝 RegExp 引用类型会变成空对象
6. 对象中含有 NaN、infinity 以及 -infinity，JSON 序列化后的结果变成 null
7. 无法拷贝对象的循环应用，即对象成环（obj[key]=obj）

```js
const obj3 = {
func: function() {console.log(1)},
obj: { name: 'h' },
arr: [1,2,3],
und: undefined,
ref: /^123$/,
date: new Date(),
NaN: NaN,
infinity: Infinity,
sym: Symbol(1)
}

console.log(JSON.parse(JSON.stringify(obj3)))
// NaN: null
// arr: (3) [1, 2, 3]
// date: "2021-01-29T16:09:10.788Z"
// infinity: null
// obj:
// name: "h"
// ref: {}
```
- 从上面代码中可以到例如：function 和 undefined 都消失了。所以，JSON.stringify 实现深拷贝，还是有很多无法实现的功能，但如果只是基础普通的对象类型，使用 stringify 还是非常快捷方便的。

#### 手写一个简单版的 深拷贝
```js
const obj = {
  name: 'achang',
  age: 25,
  skills: {
    js: '深拷贝'
  }
}
function deepCopy(obj) {
  let copyObj = {}
  for (const key in obj) {
    // && obj[key] !== null 因为 null 的 typeof 也是 object
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      copyObj[key] = deepCopy(obj[key])
    } else {
      copyObj[key] = obj[key]
    }
  }
  return copyObj
}

const obj4 = deepCopy(obj)
obj4.skills.js = '修改深拷贝'
console.log('obj4 -->', obj4) // { age: 25, name: "achang", skills: { js: "修改深拷贝" }}
console.log('obj4 -->', obj) // { age: 25, name: "achang", skills: { js: "深拷贝" }}
```
这只是简版的，利用递归的方式实现深拷贝，同 JSON.stringify 效果一样，还是有些问题没有解决


### 真正的深拷贝
- 解决上述的几个问题的思路：
  - 如果是 Date，RegExp 直接创建一个新的实例并返回
  - 如果是循环引用就用 [weakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 解决。
  - 原型的上的方法，可以结合 [Object.getOwnPropertyDescriptors](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) 获取对象上的所有属性及特性及 [Object.getPrototypeOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf) 原型上的方法和 [Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 结合使用，创建一个新对象，并继承传入原对象的原型链。
  - 对象的不可枚举属性以及Symbol 类型，可以使用 [Reflect.ownKeys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) 方法。

```js
const obj3 = {
  func: function() {console.log(1)},
  obj: { name: 'h' , data: { fn: function() { console.log('data') }, child: 'child' }},
  arr: [1,2,3],
  und: undefined,
  ref: /^123$/,
  date: new Date(),
  NaN: NaN,
  infinity: Infinity,
  sym: Symbol(1)
}
function deepCopy(obj, hash = new WeakMap) {
  // 日期类型直接返回一个新的日期对象
  if (obj instanceof Date) return new Date(obj)
  // 正则对象直接返回新的正则对象
  if (obj instanceof RegExp) return new RegExp(obj)
  // 循环引用使用 weakMap 解决
  if (hash.has(obj)) return hash.get(obj)
  const desc = Object.getOwnPropertyDescriptors(obj)
  // 获取原型上的方法和对象的描述信息，创建新的对象
  const copyObj = Object.create(Object.getPrototypeOf(obj), desc)
  hash.set(obj, copyObj)

  // 循环递归遍历内容，防止还会有共计内存的问题
  for (const key of Reflect.ownKeys(obj)) {
    let item = obj[key]
    if (typeof item === 'object' && item !== null && typeof item !== 'function') {
      copyObj[key] = deepCopy(item)
    } else {
      copyObj[key] = item
    }
  }
  return copyObj
}
console.log(deepCopy(obj3))
// NaN: NaN
// arr: (3) [1, 2, 3]
// date: Sat Jan 30 2021 14:39:47 GMT+0800 (中国标准时间) {}
// func: ƒ ()
// infinity: Infinity
// obj: {name: "h", data: {…}}
// ref: /^123$/
// sym: Symbol(1)
// und: undefined
```
![depObj.png](https://upload-images.jianshu.io/upload_images/13129256-d5017269a181c66a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

即使修改 obj.data 下的属性，也是跟之前的没有关系
```js
const depObj = deepCopy(obj3)
depObj.obj.data.child = '修改'
console.log(obj3)
// NaN: NaN
// arr: (3) [1, 2, 3]
// date: Sat Jan 30 2021 14:39:47 GMT+0800 (中国标准时间)
// func: ƒ ()
// infinity: Infinity
// obj:
//   data:
//     child: "child"
//     fn: ƒ ()
//   name: "h"
// ref: /^123$/
// sym: Symbol(1)
// und: undefined
```
![obj3.png](https://upload-images.jianshu.io/upload_images/13129256-3408801057d90d81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
