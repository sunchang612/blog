# 按奇偶排序数组
题目：
给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

你可以返回任何满足上述条件的数组作为答案。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-array-by-parity-ii

- 什么意思那？
意思是给一个数组，数组里面奇数和偶数个数像相同，然后对数组排序，i 的是个变量，i 是奇数是，对应的值也是奇数，偶数同理。

示例：

```js
输入：[4,2,5,7]
输出：[4,5,2,7]
解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
```

##### 思路：
这个题思路很简单，先遍历数组，从大到小（从小到大），然后循环数组，当索引是奇数时，放入奇数的值，偶数同理。

```js
function sortArrayByParity(ary) {
  // 先进行排序
  ary.sort((a, b) => a - b)
  let arr = []
  // 记录奇数和偶数的开始索引下标
  let odd = 1
  let even = 0
  ary.forEach(i => {
    if (i % 2 === 0) {
      arr[even] = i
      even += 2
    } else {
      arr[odd] = i
      odd += 2
    }
  })
  return arr
}
console.log(sortArrayByParity([1,5,2,7,9,3,6,8,4, 10]))
// [2, 1, 4, 3, 6, 5, 8, 7, 10, 9]

```