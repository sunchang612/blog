# JavaScript 算法（格雷编码）

题目：
格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。

```
示例 1:

输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2

对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1

示例 2:

输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]。
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/gray-code


<img src="https://upload-images.jianshu.io/upload_images/13129256-cbeb3d48113599a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>

- 从上面中找出规律，可以看出规律，例如 2 和 3

<img src="https://upload-images.jianshu.io/upload_images/13129256-385dbd231b249d7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>

- 可以看出3的结果在2的结果上，前 4 位（也就是 2的平方），前面加了一位 0 
- 而后四位，是在前 4 位的基础上倒叙，前面加了一位 1

最后代码：
```js
 function grayCode (n) {
  // 递归调用， 用来计算输入为 n 的格雷编码序列
  const result = n => {
    // 当 n 是 1 时，不需要计算，直接返回
    if (n === 1) {
      return [0, 1]
    } else {
      // 拿到上一个的值
      const prev = result(n - 1)
      const res = []
      const max = Math.pow(2, n) - 1
      for (let i = 0, l = prev.length; i < l; i++) {
        res[i] = `0${prev[i]}`
        res[max - i] = `1${prev[i]}`            
      }
      return res
    }
  }
  return result(n)
}

 const result3 = grayCode(4)
["0000", "0001", "0011", "0010", "0110", "0111", "0101", "0100", "1100", "1101", "1111", "1110", "1010", "1011", "1001", "1000"]
```
每天进步一点点