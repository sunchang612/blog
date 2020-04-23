# 最大间距

题目：
给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

如果数组元素个数小于 2，则返回 0。

- 示例 1:
```js
输入: [3,6,9,1]
输出: 3
解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
```
- 示例 2:
```js
输入: [10]
输出: 0
解释: 数组元素个数小于 2，因此返回 0。
```
说明:
- 你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
- 请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-gap

- 这个题看起来并不难，基本思路上面示例也提出来了，就是先排序，然后循环找出最大的差值.

根据这个思路的代码：
```js
function maximumGap(ary) {
  // 如果数组的个数小于 2  直接返回 0
  if (ary.length < 2) return 0

  ary.sort((a, b) => a - b)
  let max = 0
  for (let i = 0; i < ary.length - 1; i++) {
    let dif = ary[i + 1] - ary[i]
    if (dif > max) {
      max = dif
    } 
  }
  return max
}
console.log(maximumGap([1,2,7,9,3,6,10]))
// 3
```
- 可以看出上面先循环了排序，再去循环找出最大值，好像可以在排序循环中，直接找出最大值
改造后的代码，用冒泡排序做循环
```js
function maximumGap(ary) {
  // 如果数组的个数小于 2  直接返回 0
  if (ary.length < 2) return 0

  let max = 0
  let len = ary.length - 1
  let diff
  // 使用冒泡排序的方式，在排序是就算出结果
  for (let i = len; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      let tmp = ary[j]
      if (tmp > ary[j + 1]) {
        ary[j] = ary[j + 1]
        ary[j + 1] = tmp
      }
      // tmp = null
    }
    // 为什么要小于 len，因为到最后 i + 1 就没有值了
    if (i < len) {
      diff = ary[i + 1] - ary[i]
      if (diff > max) {
        max = diff
      }
    }
  }
  console.log(ary)
  // 这里不能直接返回 max, 需要在拿第一个数和第二个数比较
  // 因为冒泡排序 i 是 > 0 的，没有比较第一个数
  return Math.max(max, ary[1] - ary[0])
}
// 如果不比价就这出现这种问题，计算结果是 10，正确是 15
console.log(maximumGap([30,20,16, 1]))

```