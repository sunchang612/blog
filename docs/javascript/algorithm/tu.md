# 图是什么
图是”网络结构“的抽象模型，是一组由 边 连接的节点

JS 中没有图，可以用 Object 和 Array 构建图
图的表示法：邻接矩阵，邻接表，关联矩阵...

- 深度优先遍历
  尽可能深的搜索图的分支
  1. 访问根节点
  2. 对根节点的”没访问过的相邻节点(避免死循环)“挨个进行深度优先遍历
  ```js
  const visited = new Set()
  let dfs = (n) => {
    console.log(n)
    visited.add(n)
    path[n].forEach(c => {
      if (!visited.has(c)) {
        dfs(c)
      }
    })
  }

  ```
- 广度优先遍历
  先访问离根节点最近的节点
  1. 新建一个队列，把根节点入队
  2. 把对头出队并访问
  3. 把对头的没访问过的相邻节点入队
  4. 重复二三部，直到队列为空

  ```js
    let bfs = (n) => {
      const q = [n]
      visited.add(n)
      while(q.length) {
        const n = q.shift()
        console.log(n)
        path[n].forEach(c => {
          if (!visited.has(c)) {
            q.push(c)
            visited.add(c)
          }
        })
      }
    }
  ```