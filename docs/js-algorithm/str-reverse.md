# 反转字符串中的单词

#### 题目：
  给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

示例:
```
输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-words-in-a-string-iii

解题思路：
1. 根据 空格 把每段字符串分割成数组
2. 对数据进行遍历，把每个数组中的元素进行翻转
3. 在把数组转成字符串

```js
 function strReverse (str) {
    // 1. 字符串按空格进行分割
  let arr = str.split(' ')
  // 对数组遍历，把每个元素进行翻转
  const result = arr.map(i => i.split('').reverse().join(''))
  // 数组在转成字符串
  return result.join(' ')
}
 const result = strReverse('Let\'s take LeetCode contest')
 console.log(result)
 s'teL ekat edoCteeL tsetnoc
```
- 上面代码比较冗余，可以简写为:
``` js
 function strReverse (str) {
   return str.split(' ').map(i => i.split('').reverse().join('')).join(' ')
 }
 const result = strReverse('Let\'s take LeetCode contest')
 console.log(result)
 s'teL ekat edoCteeL tsetnoc
```
- 也可以使用正则的方式分割字符串
``` js
function strReverse (str) {
  return str.split(/\s/g).map(i => i.split('').reverse().join('')).join(' ')
}
const result = strReverse('Let\'s take LeetCode contest')
console.log(result)
s'teL ekat edoCteeL tsetnoc
```
- 或 使用 match
```js
function strReverse (str) {
  return str.match(/[\w']+/g).map(i => i.split('').reverse().join('')).join(' ')
}
 const result = strReverse('Let\'s take LeetCode contest')
 console.log(result)
 s'teL ekat edoCteeL tsetnoc
```