# 螺旋矩阵

- 题目
给定一个包含 <font color=red> m x n 个元素的矩阵（m 行, n 列）</font>，请按照顺时针螺旋顺序，返回矩阵中的所有元素。

- 示例
```
示例 1:
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]

示例 2:
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]

来源：力扣（LeetCode）
```

#### 思路

<img src="https://upload-images.jianshu.io/upload_images/13129256-a395fe953c2bb62a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>

```js
function spiralOrder(ary) {
  // 处理每一圈的数据遍历过程
  let map = (ary, r = []) => {
    for (let i = 0, len = ary.length; i < len; i++) {
      // 如果是第一行，直接复制就行
      if(i === 0) {
        r = r.concat(ary[i])
      } else if (i === len - 1) { // 如果是最后一行，翻转数组
        r = r.concat(ary[i].reverse())
      } else { // 其他只取 最后一个数
        r.push(ary[i].pop())
      }
    }
    // 删除最后一行 和 第一行
    ary.shift()
    ary.pop()

    for (let i = ary.length - 1; i >= 0; i--) {
      // 添加第一个元素
      r.push(ary[i].shift())
    }

    // 判断是否还有数据, 如果还有数据，递归计算
    if(ary.length) {
      return map(ary, r)
    } else {
      return r
    }
  }
  return map(ary, [])
}

console.log(spiralOrder([
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
])) //输出: [1,2,3,6,9,8,7,4,5]
console.log(spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]))
// [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
```
