# 递归 串联所有单词的子串
题目：
给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words

```js
示例 1：
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。

示例 2：
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```

##### 思路
- 根据示例，首先要把 words 中的每项拼接到一起 例如 barfoo, foobar 然后去匹配，获取位置信息
```js
function findSubstring(s, words) {
  // 保存结果
  let result = []
  // 记录数组的长度
  let num = words.length
  let range = (r, arr) => {
    // 到达边界，停止递归
    if (r.length === num) {
      result.push(r)
    } else {
      arr.forEach((i, index) => {
        // 克隆数组
        let tmp = [].concat(arr)
        // 删除数组中已经要合并的元素
        tmp.splice(index, 1)
        range(r.concat(i), tmp)
      })
    }
  }
  range([], words)
  // 放置位置的数组
  let placeAry = []
  result.forEach(item => {
    // 数组转换成字符串
    let str = item.join('')
    if (s.includes(str)) {
      const p = s.indexOf(str)
      placeAry.push(p)
    }
  })
  return placeAry
}
console.log(findSubstring("barfoothefoobarman", ["foo","bar"])) // [0, 9]
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])) // []
```