# 小程序获取二维码中的参数

- 获取二维码踩了一点小坑，我是直接去拿 params.query，但获取不到参数，后来看了一下文档，需要从 params.query.scene 里面获取

> 通过 ```decodeURIComponent(params.query.scene) 获取二维码中传入的 scene```

- 获取 scene 中的传入的值 (```注意：在 App.js 里面获取```)
- 例如
```js
const para = decodeURIComponent(params.query.scene)
const c = this.getQueryString('c', para)
const id = this.getQueryString('id', para)

// function
getQueryString(name, params) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  let r = params.match(reg)
  if (r != null) return unescape(r[2]); 
  return null; 
}
```
