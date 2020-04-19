# JavaScript 算法 （种花问题）

题目：
假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。
```js
示例 1:

输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
示例 2:

输入: flowerbed = [1,0,0,0,1], n = 2
输出: False
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/can-place-flowers

```js
  function FlowerBed(arr, n) {
    if (typeof n !== 'number' || arr.length === 0) return false
    let max = 0
    for (let i = 0; i < arr.length; i++) {
      // 第一个位置没有种花，并且第二个位置没有种花
      // 当前的位置 - 1 是0，并且当前的位置 + 1也是0，说明两边都没种，此时可以种一颗
      if ((i === 0 && arr[1] === 0) || (arr[i - 1] === 0 && arr[i + 1] === 0)) {
        max ++
        i++
      }
    }
    return max >= n
  } 
```
每天进步一点点