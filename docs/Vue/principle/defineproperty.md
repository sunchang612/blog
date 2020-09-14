## 模拟 Vue2.x 双向数据监听

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>defineproperty</title>
</head>
<body>
  <div id="app">
    hello
  </div>
  <script>
    // 模拟 Vue 中的 data选项
    let data = {
      msg: 'hello',
      count: 10,
      age: 20
    }
    // 模拟Vue 实例
    let vm = {}

    // 一个属性转换
    Object.defineProperty(vm, 'msg', {
      // 可枚举 可遍历
      enumerable: true,
      // 可配置（可以使用 delete 删除，通过 defineProperty 重新定义）
      configurable: true,
      get() {
        console.log('get ---->', data.msg)
        return data.msg
      },
      // 赋值的时候执行
      set(newVal) {
        console.log('set ----->', newVal)
        // 相同的不执行
        if (newVal === data.msg) return
        data.msg = newVal
        document.querySelector('#app').textContent = data.msg
      }
    })

    vm.msg = 'hello world'
    console.log(vm.msg)
  </script>
</body>
</html>
```
- 如果是多个属性，需要循环整个对象，而 Vue 2.x 是通过递归的方式遍历整个对象，从而实现响应式
- 这里使用 forEach 方式模拟
```js
// 模拟 Vue 中的 data选项
let data = {
  msg: 'hello',
  count: 10,
  age: 20
}
// 模拟Vue 实例
let vm = {}
Object.keys(data).forEach((key) => {
  // 一个属性转换
  Object.defineProperty(vm, key, {
    // 可枚举 可遍历
    enumerable: true,
    // 可配置（可以使用 delete 删除，通过 defineProperty 重新定义
    configurable: true,
    get() {
      console.log('get ---->', data[key])
      return data[key]
    },
    // 赋值的时候执行
    set(newVal) {
      console.log('set ----->', newVal)
      // 相同的不执行
      if (newVal === data[key]) return
      data[key] = newVal
      document.querySelector('#app').textContent = data.msg
    }
  })
})

// 如果是多个属性，需要循环整个对象，而 Vue 2.x 是通过递归的方式遍历整个对象，从而实现响应式
vm.msg = 'hello world'
vm.count = 5
console.log(vm.msg)
```