# JavaScript 构造函数模式
- 构造函数模式的目的就是为了创建一个自定义的类并且创建这个类的示例。

```js
function createPerson(name, age) {
  // 这里的 this 就是下面创建的实例
  this.name = name
  this.age = age
  this.learn = function() {
    console.log(`我叫${this.name}, 年龄${this.age}, 在学习js`)
  }
  // 这里不用写返回值，浏览器会在创建实例默认会返回
}

const p1 = new createPerson('小熊', 22)
p1.learn() // 我叫小熊, 年龄22, 在学习js
const p2 = new createPerson('小加', 23)
p2.learn() // 我叫小加, 年龄23, 在学习js
```
### 构造函数扩展
1. 构造函数模式中，new fn() 如果 fn 不需要传递任何参数，() 是可以省略的。
2. this : 在函数中，<font color="red">this.xxx 中的 this 都是当前类的实例。</font>
3. 函数面： 构造函数也有普通函数的一面，但执行的时候，其实只是在当前函数中形成私有的作用域，而参数只是私有作用域中的私有变量，例如： this.name 就相当于给 p1 这个实例增加了私有的属性。
4. 构造函数中，会默认的把实例返回（返回的是一个对象数据类型）
  - 如果手动 return，<font color="red">return 是基本数据类型的值，不是object， 当前的实例是不会改变的。</font>
    ```js
      function createPerson(name, age) {
        // 这里的 this 就是下面创建的实例
        this.name = name
        this.age = age
        this.learn = function() {
          console.log(`我叫${this.name}, 年龄${this.age}, 在学习js`)
        }
        return 123
        // 这里不用写返回值，浏览器会在创建实例默认会返回
      }
      const p1 = new createPerson('小熊', 22)
      p1.learn() // 我叫小熊, 年龄22, 在学习js
    ```
  - 如果 <font color="red"> return 的是引用类型的值，当前实例会被手动 return 的值改变 </font>
  ```js
    function createPerson(name, age) {
      // 这里的 this 就是下面创建的实例
      this.name = name
      this.age = age
      this.learn = function() {
        console.log(`我叫${this.name}, 年龄${this.age}, 在学习js`)
      }
      return { name: 'JavaScript' }
    }
    const p1 = new createPerson('小熊', 22)
    p1.learn() // 会直接报错
    console.log(p1.name) // JavaScript
  ```
