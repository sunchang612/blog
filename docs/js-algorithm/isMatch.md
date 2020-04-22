# 正则表达式匹配

题目：
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
```js
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
```
> 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:
- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。

- 示例 1:

```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```
- 示例 2:

```
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```
- 示例 3:
```
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```

- 示例 4:

```
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
```
- 示例 5:
```
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/regular-expression-matching

#### 思路：
根据上面的示例 可以看出有三种情况：
1. ab 这种全部是字母
2. a* 字母加 *
3. .* 这种情况

- 根据分享的这三种情况，写出正则表达式
```js
match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*)|$))/g)
```
例如：
```js
'c*a*b'.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*)|$))/g)
```
得到结果：
```js
 ["c*", "a*", "b"]
```

- 然后循环判断这三种情况，分别作出对应的处理
最后的代码:
```js
function isMatch(s, p) {
  // 利用正则把
  let modeArr = p.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*)|$))/g)
  let cur = 0
  const sLen = s.length
  for (let i = 0,len = modeArr.length; i < len; i++) {
    // 把每项分割成数组
    let m = modeArr[i].split('')
    if(m[1] === '*') {
      // 如果是这种情况 [.*]， 直接返回结果
      if (m[0] === '.') {
        cur = sLen
      } else {
        // 如果当前 m[0] 和 s[cur] 相等，那么 cur 的值 +1
        /** 举例：
          *  s 是 aab
          * 而循环到 a* ["c*", "a*", "b"]
          * 它的 s[cur] === m[0] 是匹配的
          */
        while (s[cur] === m[0]) {
          cur ++
        }
      }
    } else {
      // 这里就是第三种情况，循环找出是否与 s[cur] 位置的字符相同
      for (let j = 0, l = m.length; j < l;j++) {
        if (m[j] !== s[cur]) {
          return false
        } else {
          cur ++
        }
      }
    }
  }
  return cur === sLen
}
const result5 = isMatch('aab', 'c*a*b')
const result6 = isMatch('mississippi', 'mis*is*p*.')
console.log(result5) // true
console.log(result6) // false
```
每天进步一点点
