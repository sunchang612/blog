# 重复的子字符串

题目：
给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

```
示例 1:
输入: "abab"
输出: True

解释: 可由子字符串 "ab" 重复两次构成。
示例 2:
输入: "aba"
输出: False

示例 3:
输入: "abcabcabcabc"
输出: True
解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)

```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/repeated-substring-pattern


- 这个用正则的方式，比较简单
```
function repeatedSubstringPattern (str) {
  return /^(\w+)\1+$/.test(str)
}
const result4 = repeatedSubstringPattern('abcabc')
// true
```
w+ : w 表示 匹配任何字类字符，包括下划线。与"[A-Za-z0-9_]"等效。 + 表示：一次或多次匹配前面的字符或子表达式。例如，"zo+"与"zo"和"zoo"匹配，但与"z"不匹配。+ 等效于 {1,}。

\1+ 表示：重复问上面捕获组里的内容一次或多次
