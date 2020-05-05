# 缺失的第一个正数
题目：
给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

示例 1:
输入: [1,2,0]
输出: 3

示例 2:
输入: [3,4,-1,1]
输出: 2

示例 3:
输入: [7,8,9,11,12]
输出: 1
 
提示：
你的算法的时间复杂度应为O(n)，并且只能使用常数级别的额外空间。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/first-missing-positive

- ```思路``` 根据示例看出，如果最小数不是1 直接返回 1，如果是依次计算两个数的差值为1，如果差值不是1，则返回当前值 + 1

看代码：
```js
function firstMissingPositive(ary) {
  // 首选过滤到非整数
  ary = ary.filter(a => a > 0)
  // 判断正数数组是否为空
  if(ary.length) {
    // 先排序，从小到大排序
    ary.sort((a, b) => a - b)
    // 如果第一个元素不是 1 直接返回 1
    if (ary[0] !== 1) return 1
    
    // 遍历，只要下一个元素和当前当前元素的差值 > 1, 说明输出元素就是当前元素值 +1
    for (let i = 0; i < ary.length; i++) {
      if (ary[i + 1] - ary[i] > 1) {
        return ary[i] + 1
      }
    }
    // 如果数组是连续的正正数 如：[1,2,3]
    return ary.pop() +  1
  }
  return 1
}
```
- ```但是```： 上面的代码是可以优化的，从代码中可以看出，首选循环了两遍数组，先排序在差值，为什么不在排序时直接查找？

```js
function firstMissingPositive(ary) {
  // 首选过滤到非整数
  ary = ary.filter(a => a > 0)
  let min
  let len = ary.length
  for (let i = 0; i < len; i++) {
    // 假设当前数是最小数
    min = ary[i]
    for (let j = i + 1; j < len; j++) {
      // 如果下一个数小于 min 交换交换位置
      if (ary[j] < min) {
        let a = min
        min = ary[j]
        ary[j] = a
      }
    }
    // 有可能上面循环中交换了位置，改变了值
    ary[i] = min
    if(i === 0 && min !== 1) return 1
    if (ary[i] - ary[i - 1] > 1) return ary[i - 1] + 1
  }
  return ary.length ? arr.pop() + 1 : 1
}
```
- ```但是```： 其实上面的方式还是可以优化的，就是把 filter 拿掉，在循环中判断，但会增加 循环次数，要看数据的情况而定哪种方式最好。
