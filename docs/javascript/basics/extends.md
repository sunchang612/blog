# JavaScript几种继承的方式及优缺点
## 原型继承
原型继承是比较常见一种继承方式
```js
function Parent() {
  this.name = 'parent'
  this.action = function () {
    console.log(this.name)
    return this.name
  },
  this.arr = [1,2]
}

Parent.prototype.getName = function () {
  console.log(this.name)
  return this.name
}

function Child() {
  this.name = 'child'
}
// 实例化父函数，链接到自己的原型链上
Child.prototype = new Parent
const child1 = new Child
console.log(child1)
```
![child.png](https://upload-images.jianshu.io/upload_images/13129256-56662c0fd3a7af2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从上图中可以看到,  原型继承的特点：`把父类的公有(prototype)+私有属性都继承到了子类的原型上(公有属性 prototype)`
#### 注意：原型继承的缺点
```js
  const child2 = new Child
  console.log(child1)
  child2.arr.push(3)
```
如果有一个子类 child2 调用 父类的 arr 属性并添加了内容
此时来看 child1 和 child2
![child1.png](https://upload-images.jianshu.io/upload_images/13129256-d9ed193b6b7a78ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从上面的结果中发现，child2 修改了父类的属性，child1 的父类属性也被修改了。这也很好理解，因为它俩都继承与同一个 parent。它们的内存空间是共享的。
所以：```原型的缺点：子类会共享父类的的内存空间```

## 构造函数继承（call或apply）
```js
function Parent() {
  this.name = 'parent'
  this.action = function () {
    console.log(this.name)
    return this.name
  },
  this.arr = [1,2]
}

Parent.prototype.getName = function () {
  console.log(this.name)
  return this.name
}
function Child () {
  // 还有这里注意，如果子类的属性名和父类的一样，要看它的循序，谁在下面用谁的声明
  this.name = 'Child'
  // Parent.call(this)
  Parent.apply(this)
}
const child1 = new Child
const child2 = new Child
child2.arr.push(3)
console.log('child1 --->', child1)
console.log('child2 --->', child2)
```
![call.png](https://upload-images.jianshu.io/upload_images/13129256-e062dc50185e7885.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
使用这种解决了数据共享的问题
`但是：` 只能继承父类的实例属性和方法，不能继承原型属性或者方法。

## 组合继承 （call + prototype）

```js
function Parent() {
  this.name = 'parent'
  this.action = function () {
    console.log(this.name)
    return this.name
  },
  this.arr = [1,2]
}
Parent.prototype.getName = function () {
  console.log(this.name)
  return this.name
}

function Child() {
  this.name = 'child'
  Parent.call(this)
}
Child.prototype = new Parent
Child.prototype.constructor = Child
const child1 = new Child
console.log(child1)
```
![image.png](https://upload-images.jianshu.io/upload_images/13129256-7bbeb4d45412c4b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
优点：解决了 原型继承和构造函数继承的缺点。
但是这种方式也有缺陷：从上图中可以看出，子类原型上多了一份父类的实例属性。因为```父类的构造函数被调用了两次，生成了两份，子类实例上的屏蔽了原型上的，造成了内存浪费```

## 寄生式继承 （Object.create）
就是使用原型继承获取一份浅拷贝对象。然后利用这个浅拷贝对象在进行增强。
缺点和原型继承一样，但对于普通对象的继承来说，可以在父类的基础上添加更多的方法
```js
let Parent1 = {
  arr: ['a', 'b'],
  name: 'Parent1',
  getName: function() {
    return this.name
  }
}
function Child(parent) {
  let copy = Object.create(parent)
  console.log(copy)
  copy.getArray = function () {
    return this.arr
  }
  return copy
}

let Child1 = Child(Parent1)
console.log(Child(Parent1))
console.log('child1 -->', Child1.getArray()) // ['a', 'b']
console.log('child1 -->', Child1.getName()) // Parent1
```
- 缺点 不能实例化，也没有用到原型。

## 寄生组合式继承
```js
function Parent() {
  this.name = 'parent'
  this.action = function () {
    return this.name
  },
  this.arr = [1,2]
}

Parent.prototype.getName = function () {
  return this.name
}

function Child() {
  Parent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const child1 = new Child
const child2 = new Child
console.log(child1)
```
- 解决了上面几种几种的缺陷，也较好的实现了继承的结果即 `父类私有属性放放子类私有中，原型上的属性和方法放到子类原型上`

注意：上面写的继承中，为什么要手动修改 constructor 的指向
`因为：在 JS 的规定中，xxx.prototype.constructor 的指向是当前函数（类）本身。也就是指向自己`，我们上面用到的寄生继承、组合继承等，如果不修改 constructor 的指向，它会指向 Parent 这个类, 如下：
```js
// Child.prototype.constructor = Child
 console.log('constructor -->', Child.prototype.constructor === Parent) // true 
```
去掉手动指向，Child 的 constructor 就指向了 Parent，所以违背了 JS 的标准规范。

## ES6 extends 关键字
在 ES6 中，直接使用 extends 关键字可以很容易的实现 JavaScript 继承，并且 babel 编辑之后，它采用的也是 `寄生组合继承的方式`，这种方式是较优的解决继承的方式。
```js
class Parent2 {
  constructor(name) {
    this.name = name
  }
  getName = function (){
    return this.name
  }
}
class Child2 extends Parent2 {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}
const child3 = new Child2('parent', 22)
const child4 = new Child2('parent1', 25)
console.log(child3.getName())
console.log(child3)
console.log(child4)
```
![extends.png](https://upload-images.jianshu.io/upload_images/13129256-1d1db335702b2a74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
