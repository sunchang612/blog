# Typescript 基本语法

## 概念
- TypeScript 是一种强类型语言
#### 什么是强类型语言
  - 不允许改变变量的数据类型，除非进行强制的类型转换 TypeScript 是强类型语言
#### 什么是弱类型语言
  - 变量可以被赋予不同的数据类型  JavaScript 是弱类型语言
#### 静态类型语言
  - 在编译阶段确定所有变量的类型
#### 动态类型语言
  - 在执行阶段确定所有变量的类型  JavaScript

## 安装
- npm install typescript -g 
### 创建 tsconfig.json
- tsc --init
### 编译
- tsc filename 编译成 JavaScript

## 基本数据类型
### ES6
  - Boolean
  - String
  - Number
  - Array
  - undefined
  - null
  - Function
  - Object
  - Symbol

### TS 数据类型
  - Boolean  
  - Number
  - String
  - Array
  - Function
  - Object
  - Symbol
  - undefined
  - null 
  - void
  - any
  - never
  - 元组 Tuple
  - 枚举 enum
  - 高级类型

## 基本数据类型的使用
### boolean
```ts
let isBoolean: boolean = false
let arr: Array<number> = [1,2,3] // 这个数组只能是 number 类型
// arr 和 arr2 是等价的
let arr2: number[] = [1,2,3]
// 多种类型的 Array
let arr3: Array<number|string> = [1,2,3, '4']
```
### 数字
- TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
```ts
let num: number = 123
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
```
### 字符串
```ts
let name: string = 'achang'
let name1: string = `Hello ${name}`
```
### 数组
```ts
let arr: Array<number> = [1,3,4]
let arr2: number[] = [1,3,4] // 必须是number类型
let arr3: Array<number|string> = [1,2,3, '4'] // 可以是number 或 string 类型
```
### 元组
```ts
// 不能添加元素
let tuple: [number, string] = [0, '1']
// 可以手动添加新元素，可以添加进去
tuple.push('1')
tuple[2] // 但是可添加不能访问

let x: [string, number]
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
### 枚举
- 默认情况下，会从0索引时开始
```ts
// 枚举
enum Direction {
  Up,
  Down,
  Left,
  Right
}
// 会从0索引开始取值
console.log(Direction.Up) // 0
console.log(Direction[0]) // Up
```
- 如果填写了 value
```ts
// 如果赋值
enum Direction2 {
  Up = 1,
  Down,
  Left,
  Right
}
// 后面的会依次递增 Down = 2
```
- 字符串枚举
```ts
// 字符串枚举
// 常量枚举，编译时会直接赋值，节省空间
enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const value = 'UP'
if (value === Direction3.Up) {
  console.log('相等的')
}
```
### Any
- 任何类型，加 Any 就跟 JavaScript 效果一样。
- 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
```ts
let notSure: any = 4
notSure = "maybe a string instead"
notSure = false
```
### Void
- 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```ts
// void 表示没有任何返回值的类型
let noReturn = () => {}
function warnUser(): void {
  console.log("This is my warning message")
}
```
- 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
```ts
let unusable: void = undefined
// void 0 --> undefined,
```
### Null 和 Undefined
- TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
- 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
```ts
let u: undefined = undefined
let n: null = null
let num: number = null
```
### Never
- <font color="red"> never 永远不会有返回值的类型 </font>
- never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
- never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 <font color="red">any也不可以赋值给never</font>。
```ts
let err = () => {
  new Error()
}
```


## 函数 Function
### 基本使用
```ts
// 参数是 number，返回值也是 number
function add1(x: number, y: number): number {
  return x + y
}
let res = add(1,2)
```
### 可选参数和默认参数
```ts
function add2(x = 123, y?:number) {
  return x + y
}
add2()
```
### 扩展运算符 ... 参数不固定式，可选参数必须要放到必选后面
```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
```

## 函数重载
```ts
// 函数的重载
function add4(...rest: number[]): number;
function add4(...rest: string[]): string;
function add4(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((p, c) => p + c)
  }
}
add4(1,2,3)
```
- 为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，<font color="red">一定要把最精确的定义放在最前面</font>。

## object
- 基本使用
```ts
// 对象
let obj: {x: number, y: number} = { x: 1, y: 1}
obj.y = 1
```

## interface 接口
```ts
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}
```
-  只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
```ts
let myObj = {size: 10, label: "Size 10 Object"}
printLabel(myObj)
```
### 使用类型断言的方式
```ts
interface Result {
  data: List[]
}
function render(result: Result) {
  result.data.forEach((a) => console.log(a))
}
let result1 = {
  data: [
    { id: 1, name: 'A' }
  ]
}
render(<Result>{
  data: [
    { id: 2, name: 'A' }
  ]
})
```
### 可选属性
- 
```ts
interface List {
  name: string;
  age?: number; // 可有可无
}

```
### 可索引类型
#### number 索引
```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray
myArray = ["Bob", "Fred"]

```
- 定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
- TypeScript支持两种索引签名：字符串和数字。 

#### string 索引
- 下面的含义： 用任意的字符串去索引 StringNames 得到的结果都是 string
```ts
interface StringNames {
  [x: string]: string
}
```
#### number 和 string 索引混用
```ts
interface StringArray {
  [x: string]: string;
  // name: number --> ❌ `name`的类型与索引类型返回值的类型不匹配
  [y: number]: string;
  // [y: number]: number; ❌ 数字索引类型“number”不能赋给字符串索引类型“string”。
}

```

## 函数类型的接口 interface
- 两种定义方式是等价的
```ts
let add: (x: number, y: number) => number
interface Add {
  // 参数和返回值
  (x: number, y: number): number
}
```
### 类型别名的方式 type
```ts
type Add1 = (x: number, y:number) => number

let add: Add1 = (x, y)  => x + y
```

### 混合接口
```ts
// 混合接口
interface Lib {
  (): void;
  version: string;
  doSome(): void;
}
let lib: Lib = (() => {}) as Lib
lib.version = '1.0'
lib.doSomething = () => {}
```
- 这样会在全局有个变量，可以使用单利模式解决
```ts
function LibF() {
  let lib: Lib = (() => {

  }) as Lib
  lib.version = '1'
  lib.doSome = () => {}
  return lib
}
```

## 类 class
- 1. 无论 ts 还是 es(javascript) 中类成员的属性都是实例属性而不是原型属性，类成员的方法都是实例方法
- 2. 实例的属性必须有初始值或被构造函数初始化
```ts
class Dog {
  // 私有化，函数不能调用，也不能继承
  // private constructor(name: string) {
  //   this.name = name
  // }
  // 函数不能被实例化，只能被继承
  // protected constructor(name: string) {
  //   this.name = name
  // }
  constructor(name: string) {
    this.name = name
  }
  name: string
  age?: numebr // 可选属性
  run() {}
  private call() {} // 私有属性 子类和实例不能调用
  protected pro() {} // 受保护成员， 不能被实例化，只能被继承
  // 只读属性 只读属性必须在声明时或构造函数里被初始化。
  readonly log: number = 4
  // 静态成员， 只能通过类名调用，不能实例调用，子类可以调用
  static food: string = 'bones'
}
```
- <font color="red"> private: </font>私有属性 子类和实例不能调用
- <font color="red"> protected:</font> 受保护成员， 不能被实例化，只能被继承
- <font color="red"> readonly:</font> 只读属性 只读属性必须在声明时或构造函数里被初始化。
- <font color="red"> static:</font> 静态成员， 只能通过类名调用，不能实例调用，子类可以调用
### 继承 extends
```ts
class Husky extends Dog {
  // 构造函数加属性，public 将参数实例属性，声明和赋值合并至一处
  constructor(name: any, public color: string) {
    super(name)
    this.color = color
  }
  // color: string  
  sleep() {
    console.log('dog sleep')
  }
}
```

## 抽象类 abstract
- 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。也不允许实例化
- 抽象类的好处就是可以抽离一些事物的共性，有利于代码的复用和扩展
// 抽象类可以实现多态
### 子类实例化，可以调用父类的方法
```ts
// 抽象类
abstract class Animal1 {
  constructor() {
  }
  eat() {
    console.log('eat ==>')
  }
  // 抽象方法
  abstract sleep(): void
}

class Dog4 extends Animal1 {
  constructor() {
    super()
  }
  name: string
  sleep() {
    console.log('dog sleep')
  }
}

let dog2 = new Dog4()
dog2.eat() // 子类实例化，可以调用父类的方法
dog2.sleep()
```
## 抽象类实现多态
- 基于上面的代码，我们在加一个子类
```ts
class Cat extends Animal1 {
  sleep() {
    console.log('car sleep')
  }
}
let cat = new Cat()

// 实现多态
let amimals: Animal1[] = [dog2, cat]
// 循环调用子类的方法
amimals.forEach(a => {
  a.sleep()
})
// 结果 --> dog sleep car sleep
```

## this 实现链式调用
```ts
// 实现链式调用
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}
new WorkFlow().step1().step2()

// 还以用子类继承父类的方式
class MyWorkFlow extends WorkFlow {
  next() {
    return this
  }
}

new MyWorkFlow().next().step1().next().step2()

```

## 接口和类
### 基本概念
- 接口与类 是可以相互继承的
- 接口和接口继承

### 类实现接口的约束
- 接口只能约束类的公有成员
- 接口不能约束类的构造函数

```ts
interface Human {
  name: string
  eat(): void
}
class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  name: string
  eat() {

  }
  // 类可以定义自己的属性
  sleep() {}
}
```

## 接口的继承
```ts
interface Human {
  name: string
  eat(): void
}
interface Man extends Human {
  run(): void
}

interface Child {
  cur(): void
}
```
- 继承多个接口
```ts
// 继承多个接口
interface Boy extends Man, Child {
}
// 实现 Boy 的约束, 需要把所有的接口约束都加上
let boy: Boy = {
  run() {}, 
  name: '', 
  eat() {}, 
  cur() {}
}
```

## 接口继承类, 类继承接口
- 使用 implements 关键字 实现 interface 接口的约束
- implements: 可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

```ts
class Parent {
  state = 1
}
interface AutoInterface extends Parent {
  
}
// 实现 AutoInterface 的约束, 也就是 Parent 中的属性
class C1 implements AutoInterface {
  state = 1
}

// 这样直接继承了 Parent 的 state 属性
class Bus extends Parent implements AutoInterface {
  
}
const child = new Bus()
child.state
```

## 泛型
- 既能约束类型，又可以灵活使用各种类型，而不需要使用 any 
- 在定义时不约束类型，在实现时约束类型
### 泛型约束函数
```ts
// 泛型
function log<T>(value: T): T {
  console.log(value)
  return value
}
// 两种调用方式
// 1 指定类型
log<string>('1')
log<number>(1)
// 2 使用类型推断，ts 会自动获取类型
log('1')

```
### 类型别名的方式
```ts
type Log = <T>(value: T) => T
let myLog: Log = log
const s = myLog<number>(1)
```

#### interface + 泛型
- 使用时必须指定一个类型
```ts
interface Log<T> {
  (value: T): T
} 
let myLog: Log<number> = log
myLog(1)
```
- 也可以在创建 interface 使用默认类型
```ts
interface Log<T = string> {
  (value: T): T
} 
let myLog: Log = log
myLog('1')
```

### 泛型约束类
```ts
class Log3<T> {
  run(value: T) {
    console.log(value)
    return value
  }
}

// 不指定类型参数时，value 的值可以是任意类型的值
let log3 = new Log3()
log3.run('1')
// 指定类型参数
let log4 = new Log3<number>()
log4.run(1)
```

### 泛型继承接口
```ts
// 泛型 继承 接口
interface Length {
  length: number
}
function log2<T extends Length>(value: T): T {
  console.log(value, value.length)
  return value
}

log2([1])
log2('1')
// log2(1123) ❌
```
### 泛型的好处
- 函数和类可以轻松的支持多种类型，增强程序的扩展性
- 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
- 灵活控制类型之间的约束
