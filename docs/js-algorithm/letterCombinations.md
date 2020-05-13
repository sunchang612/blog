# 电话号码的字母组合

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

<img src="https://upload-images.jianshu.io/upload_images/13129256-f8771db06bac4b36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" art=""/>


示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number

思路：
1. 首先要存储每个按键所代表的字母
2. 根据输入的数字，找出数字所对应的 字母
3. 循环递归获取拼接后的字母组合

```
// 简单的方式，用数组的索引代表每个键盘的字母
function mergeLetters(str) {
  // 简单的方式，用数组的索引代表每个键盘的字母
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

  // 输入的数字，转成数组， 输入字符串分割成数组，234 => [2,3,4]
  const mumber = str.split('')

  // 根据 number 映射 map 的值
  const code = []
  mumber.forEach(m => {
    if (map[m]) {
      code.push(map[m])
    }
  })

  const merge = (ary) => {
    // 临时变量，用来保存 递归后的结果
    let temAry = []

    for (let i = 0; i < ary[0].length; i++) {
      const cur = ary[0][i];
      for (let j = 0; j < ary[1].length; j++) {
        const cur2 = ary[1][j];
        temAry.push(`${cur}${cur2}`)
      }
    }
    // 替换数组，把数组前两位，替换成 temAry
    ary.splice(0, 2, temAry)

    if(ary.length > 1) {
      merge(ary)
      console.log(ary)
    } else {
      return temAry
    }
    // 返回最后的结果，因为最后只有一个元素
    return ary[0]
  }
  return merge(code)
}
const result = mergeLetters('234')

```
<img src="https://upload-images.jianshu.io/upload_images/13129256-2fcccad9c120ffb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" art="" />
