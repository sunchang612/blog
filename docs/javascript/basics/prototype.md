## JavaScript 原型链 及 原型模式
### 什么是原型模式
```
function A () {
  this.x = 100
  this.y = 100
  this.sum = function() {
    console.log('私有的 sum', this.x + this.y)
  }
}

A.prototype.getX = function() {
  this.x += 200
  console.log('x --->', this.x)
}
A.prototype.sum = function() {
  console.log('调用公共的 sum', this.x + this.y)
}
```
- 把一些公共的方法放到构建函数的原型上。

```
```
### 概念：
每个函数数据类型（普通的函数/类）都有一个天生自带的属性： prototype，属性时对象数据类型
并且在 prototype 上浏览器还天生给它加了一个属性叫 constructor （构造函数），属性值是当前函数（类）的本身
每一个对象数据类型（普通的对象、实例、prototype）也都有一个天生自带的属性 __proto__ 属性值是当前实例所属类的原型（prototype）


- 什么是原型链 ?
例如：
```
const a = []
a.push('b')
```
a 是什么找到 push 方法的
可以在控制台打印一下 a 

可以看出 a 是通过一个叫 __proto__ 的属性找到了 Array 上的 push 方法
- 概念
- 通过 对象名.属性名 的方式获取属性值的时候，首先会在对象的私有作用域查找，如果没有则通过 __proto__ 找到对象所属类的原型，```如果原型上存在，取的是公共属性```，如果原型上没有则在通过 __proto__ 继续找，一直找到 object.prototype 为止，这种的查找的机制，称为``原型链模式``


