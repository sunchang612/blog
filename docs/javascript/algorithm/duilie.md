## 队列是什么？
一个先进先出的数据结构

```js
const queue = []

queue.push(1) // 入队
const item = queue.shift() // 出队 
```

## 什么场景下使用队列
1. 所有需要先进先出的场景。
  例如： 排对买车票的场景
        JS 异步中的任务队列
        计算最近请求次数
