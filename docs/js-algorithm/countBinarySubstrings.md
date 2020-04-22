# 计数二进制子串

题目:
给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

重复出现的子串要计算它们出现的次数。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-binary-substrings
示例:
输入: "00110011"
输出: 6
解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。
请注意，一些重复出现的子串要计算它们出现的次数。

- 什么意思 ？
  计算相同数量的的 0和 1，但必须是连续的

思路:
##### 循环遍历字符串，每次从 i 个位置开始截取字符
```js
  for (let i = 0; i < str.length - 1; i++) {
    let sub = match(str.slice(i))
    if (sub) {
      ary.push(sub)
    }
  }
```
##### 根据 截取的字符，做正则匹配
  先找出连续出现的 0 1 或者 00 11
  ```js
   const num = str.match(/^(0+|1+)/)[0]
  ```
- 如果是 00 紧挨的必须是 11，如果是 0 那必须是 1
```js
  // 如果是 0 ^1 会是1 ，然后根据前面 num 去除的个数，进行重复
  const n = (num[0] ^ 1).toString().repeat(num.length)
```
 ```^```（位异或）意思是：  两二进制上下比较只有位不相等时才取1，否则取零
 举例说明：
  14^15  (14 的二进制  1110,15 的二进制   1111   14^15的结果  0001 -> 结果1)
  12 和 5 进行位异或运算，则返回值为 9  为什么 ?
![](https://upload-images.jianshu.io/upload_images/13129256-2e558495dc653e96.gif?imageMogr2/auto-orient/strip)

##### 然后在根据动态正则进行匹配 
```js
  const reg = new RegExp(`^(${num}${n})`)
  if (reg.test(str)) {
    return RegExp.$1
  }
```

最后所有代码
```js
  const ary = []
  // 给定任意子输入，都返回第一个符合条件的
  const match = (str) => {
    // 1. 先找出连续的 0 或者 1 
    const num = str.match(/^(0+|1+)/)[0]
    // 如果是 00 紧挨着 必须是 11
    // 如果是 0 紧挨着 必须是 1
    // repeat() 方法字符串复制指定次数
    // 如果是 0 ^1 会是1 ，然后根据前面 j 去除的个数，进行重复字符串
    const n = (num[0] ^ 1).toString().repeat(num.length)
    const reg = new RegExp(`^(${num}${n})`)
    if (reg.test(str)) {
      return RegExp.$1
    }
    return ''
  }

  // 通过 for 循环控制程序运行的流程
  for (let i = 0; i < str.length - 1; i++) {
    console.log('i ----->', str.slice(i))
    let sub = match(str.slice(i))
    if (sub) {
      ary.push(sub)
    }
  }
  return r.length
```
