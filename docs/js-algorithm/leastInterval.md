# 任务调度器 （队列）

- 题目
>给定一个用字符数组表示的 CPU 需要执行的任务列表。其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。
然而，两个<font color=red>相同种类的任务之间必须有长度为 n 的冷却时间</font>，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。
你需要计算完成所有任务所需要的  <font color=red>最短时间</font>。

- 示例 ：
```js
输入：tasks = ["A","A","A","B","B","B"], n = 2
输出：8
解释：A -> B -> (待命) -> A -> B -> (待命) -> A -> B.
     在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。 
```

- 提示：
  - 任务的总个数为 [1, 10000]。
  - n 的取值范围为 [0, 100]。

来源：力扣（LeetCode）

- 代码
```js
function leastInterval(tasks, n) {
  // 表示最终队列执行的结果
  let q = ''
  // 对归类进行存储
  let Q = {}
  // 进行归类
  /**
    * {
    *    A: 3,
    *    B: 3
    * }
    */
  tasks.forEach(i => {
    if (Q[i]) {
      Q[i] ++
    } else {
      Q[i] = 1
    }
  })
  
  while(1) {
    // 任务清单
    let keys = Object.keys(Q)
    // 如果不存在任务
    if (!keys[0]) {
      break
    }

    // 声明一个队列，用来存储 1+n 任务单元
    let tmp = []
    for (let i = 0; i <= n; i++) {
      // 最大值
      let max = 0
      // 任务名称 
      let key 
      // 位置     
      let pos  
      // 找出最大值
      keys.forEach((item, index) => {
        //
        if (Q[item] > max) {
          max = Q[item]
          key = item
          pos = index
        }
      })

      if(key) {
        
        tmp.push(key)
        // 删除任务
        keys.splice(pos, 1)
        Q[key]--
        // 如果任务全部结束
        if (Q[key] < 1) {
          // 删除这个元素
          delete Q[key]
        } else {
          break
        }
      }
      console.log(tmp)
      q += tmp.join('').padEnd(n + 1, '-')
    }
  }
  // 边界处理，最后因为没有任务，不需要加入冷却时间
  q = q.replace(/-+$/g, '')
  return q.length
}
  console.log(leastInterval(["A","A","A","B","B","B"], 2)) //8
```