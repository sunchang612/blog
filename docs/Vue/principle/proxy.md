## Vue 3.x 数据响应式原理
- Proxy 
  - 直接监听对象，而非属性
  - ES6 中新增，IE不支持，性能由浏览器去优化

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxy</title>
</head>
<body>
  <div id="app">
    hello
  </div>
  <script>
    // 模拟 Vue 中的 data
    let data = {
      msg: 'hello',
      count: 10
    }
    // 模拟 Vue 实例
    let vm = new Proxy(data, {
      // 执行代理行为的函数 访问 vm 的成员会执行
      get(target, key) {
        console.log('target, key ------>', target, key)
        return target[key]
      },

      set(target, key, newVal) {
        console.log('set, key ------->', key, newVal)
        if (target[key] === newVal) {
          return
        }
        target[key] = newVal
        document.querySelector('#app').textContent = target[key]
      }
    })

    vm.msg = 'hello world'
    console.log(vm.msg)
  </script>
</body>
</html>

```
- proxy 直接可以代理整个对象，而 defineProperty 需要手动循环代理每个对象里的每个属性