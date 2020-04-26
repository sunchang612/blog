# 封装 axios
axios 一个很常用的 Vue 或 react 项目中使用的第三方请求接口的库
接下来分享一下平时自己业务项目中，怎么封装 axios

#### 首先用 crate 创建一个实例
```js
  const request = axios.create({
    baseURL: 'https://xxxx',
    timeout: 100000,
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    }
  })

  export default request
```
- 一般会用到上面这几个参数
  - baseURL：将自动加在 'url' 前面，例如你可以放公司接口域名前缀，但会用到本地，测试，线上环境的 URL 地址不同，需要通过参数来判断
  ```js
    const { NODE_ENV } = process.env
    const HOST = {
      development: 'http://192.168.1.111:8080',
      production: 'https://xxxx.com'
    }[NODE_ENV]
  ```
  - timeout：接口请求的超时时间
  - headers：自定义的请求头

#### 添加请求前的拦截器
- 例如，我们常用的请求前加 loading 效果，就可以这么写
```js
  request.interceptors.request.use(
    request => {
      // 这里调用 loading 组件
      // loading 可以自己实现，或者用第三方组件库
      Toast.loading('Loading...', 0)
      return request
    },
    error => {
      // 如果报错，对错误进行处理
    }
  )
```

#### 添加响应的拦截器
- 我们可以在这里处理，服务端的正确返回结果，或者优化接口报错提醒，关闭 loading 效果，增加错误埋点等。 详细看下面每行代码注释
```js
request.interceptors.response.use(
  response => {
    // 例如，服务端状态是 200 时，关闭 loading 效果，返回 response
    if (response.data.status === 200) {
      Toast.hide()
      return response
    } else {
      // 一般服务端不会返回直接系统级 的报错状态吗，例如返回 2000 ，表示接口请求报错
      Toast.hide()
      // 关闭loading效果，弹出 message 组件，告诉用户哪里出错了
      this.$message('xxxx')
      // 还可以增加埋点，方便我们排查错误
    }
  },
  // 这里处理 系统 报错，例如： 500，400，403 等
  error => {
    // 同样，需要关闭 loading
    Toast.hide()
    // 处理 500 的报错
    if (error.response && error.response.status === 500) {
      Message.error(JSON.stringify(error.response.data))
    } else if (error.response && error.response.status === 413) {
      Message.error('文件太大啦！')
    }
  }
)
```

#### 增加默认值
- 例如：把登陆之后后端返回的 token 塞到 header 里面
```
request.defaults.headers.common['accesstoken'] = token
```
request 是 axios.create() 创建后返回的实例

#### 在项目中使用
- 使用 async await 的方式
例如：在 Vue mounted 生命周期里
```js
  async mounted() {
    const { data } = await request.post('/api/xxx', ...params)
  }
```
- request.post 请求的方式，有 get，delete，put 等
- params 需要传递给接口的参数
- data 接口的返回结果

#### 最后封装 axios 完成的代码
- 可自行根据业务需求添加，我分享出来整体的结构
```js
import axios from 'axios'
import { Message } from 'element-ui'
const { NODE_ENV } = process.env

const HOST = {
  development: 'http://192.168.1.xxx:8080',
  production: 'https://xxx'
}[NODE_ENV]

export const request = axios.create({
  baseURL: HOST,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
})

request.interceptors.request.use(
  req => {
    Toast.loading('Loading...', 0)
    return req
  },
  error => {
    return error
  }
)

request.interceptors.response.use(
  response => {
    if (response.data.status === 200) {
      Toast.hide()
      return response
    } else {
      Message.error(JSON.stringify(response.data.message))
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status === 500) {
      Message.error(JSON.stringify(error.response.data))
    }
    return Promise.reject(error)
  }
)

```