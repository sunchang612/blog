# 最大矩形
- 题目：
给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

- 示例：
```
输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximal-rectangle
```

- 这个题相当的复杂，在 LeetCode 上也是困难的难度
#### 思路
1. 根据示例看出，
<img src="https://upload-images.jianshu.io/upload_images/13129256-631bc929e0545be1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>
> 找出最大矩形的范围是所有都包含1的，形成的矩形。
2. 从新排列二位数组，把所有的0去掉，在记录每个1的开始和结束位置
    例如上面示例可以改变成
    ``` 
     [[0, 0], [2, 2]]
     [[0, 0], [2, 4]]
     [[0, 4]]
     [[0, 0], [3, 3]
    ```
3. 找出没两行之间的交集点，例如：1 和 2  2和3
    ```
     // 1 和 2 的交集点
      [2，2]
     // 2 和 3 的交集点
      [2,  4]
    ```
    - 以此类推，递归找出所有的交集点

```js
function maximalRectangle(ary) {
  let res = []
  // 提取所有的 1 至少两个以上
  let reg = /1{2,}/g
  // 把 二维数组中，相邻的 1 提取提取出来 （起始点 和 结束点）这部的结果 [[1,3], [5, 6]]
  ary = ary.map(item => {
    const str = item.join('')
    let r = reg.exec(str)
    // 存储临时的结果, 上面分析第二步的结果
    let pr = []
    // 使用循环，把所有的匹配结果都拿到
    while (r) {
      pr.push([r.index, r.index + r[0].length - 1]) 
      r = reg.exec(str)
    }
    return pr
  })
  // return
  // 递归找出所有的相邻的矩形
  // c 的意思是处理的行数
  let maxRect = (ary, res, c = 1) => {
    // 拿出两行的数据，进行计算相交点， 上面第三步骤 （需要所有的数组都要比较）
    const pre = ary.pop()
    const next = ary.pop()
    // 记录第一行的每个开始和结束的点
    let pp
    // 记录第二行的每个开始和结束的点
    let nn
    // 记录交叉的开始索引
    let start = false
    // 记录交叉的结束索引
    let end = false
    
    // 最小宽度
    let minWidth = 1
    // 最大的宽度
    let maxWidth = 1
    c ++ 

    // 交集遍历，找出两行的交叉点
    for (let i = 0; i < pre.length; i++) {
      pp = pre[i]
      for (let j = 0; j < next.length; j++) {
        nn = next[j]
        // 起始点 - 开始点
        minWidth = Math.min(pp[1], nn[1]) - Math.max(pp[0] - nn[0])     
        // 如果最小宽度大于 最大宽度
        if (minWidth > maxWidth) {
          maxWidth = minWidth
          // 这里 start 取最大值，end 取最小的值
          start = Math.max(pp[0], nn[0])
          end = Math.min(pp[1], nn[1])
        }
      }
    }
    
    // 如果没有找到交叉的点
    if (!start || !end) {
      // c 小于 3，说明没有找到交叉的点
      if (c < 3) {
        return false
      } else {
        // top[0][1] - top[0][0] + 1 什么意思？ 
        // 例如 [[2，4]] 意思是 4 - 2 算出宽度， + 1 是因为索引是 0 开始的，所以要 + 1
        minWidth = pre[0][1] - pre[0][0] + 1
        // 如果大于 1 说明是 矩形
        if (minWidth > 1) {
          // 为什么 c - 1 因为 当 c 等于 3 的时候，其实才计算了两行的交叉
          res.push((c - 1) * minWidth) // 长 * 宽 计算面积
        }
      }
    } else { // 如果找到结果
      // 如果找到了，就把开始和结束位置放进去，进行下一次循环
      ary.push([[start, end]])
      maxRect(ary, res, c++)
    }
  }
  // 计算所有的行数，
  while(ary.length > 1) {
    maxRect([].concat(ary), res)
    ary.pop()
  }

  // 去最大值
  let max = 0
  let item = res.pop()
  while(item) {
    if (item > max) {
      max = item
    }
    item = res.pop()
  }

  return max > 0 ? max : -1
}
console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])) // 6
```