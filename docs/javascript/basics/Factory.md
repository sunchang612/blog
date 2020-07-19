# JavaScript 工厂模式
- 把实现同一件事情的相同的代码放到一个函数中，直接调用函数执行即可，解决产生大量重复代码的问题，其实也能叫做<font color="red">”函数封装”</font> —— 又叫 <font color="red">“低耦合高内聚”</font>：<font color="red">减少页面中冗余的代码，提升代码重复使用率。</font>

```js
 function createPerson(name, age) {
    var obj = {}
    obj.name = name
    obj.age = age
    obj.learn = function() {
      console.log(`我叫${this.name}, 年龄${this.age}, 在学习js`)
    }
    return obj
  }

  var test1 = createPerson('你好', 20)
  var test2 = createPerson('Jony', 19)
  test1.learn() //我叫你好, 年龄20, 在学习js
  test2.learn() // 我叫Jony, 年龄19, 在学习js
```
### 工厂模式的弊端
  - <font color="red">搞不清楚它是哪个对象的实例</font>
  ```js
    console.log(test1 instanceof Object) // true
    console.log(typeof test1) // object
  ```
