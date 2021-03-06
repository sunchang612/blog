# 棒球比赛 （栈）
::: tip 题目
你现在是棒球比赛记录员。
给定一个字符串列表，每个字符串可以是以下四种类型之一：

1. 整数（一轮的得分）：直接表示您在本轮中获得的积分数。
2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
你需要返回你在所有回合中得分的总和。
:::

```
示例 1:
输入: ["5","2","C","D","+"]
输出: 30
解释: 
第1轮：你可以得到5分。总和是：5。
第2轮：你可以得到2分。总和是：7。
操作1：第2轮的数据无效。总和是：5。
第3轮：你可以得到10分（第2轮的数据已被删除）。总数是：15。
第4轮：你可以得到5 + 10 = 15分。总数是：30。


示例 2:
输入: ["5","-2","4","C","D","9","+","+"]
输出: 27
解释: 
第1轮：你可以得到5分。总和是：5。
第2轮：你可以得到-2分。总数是：3。
第3轮：你可以得到4分。总和是：7。
操作1：第3轮的数据无效。总数是：3。
第4轮：你可以得到-4分（第三轮的数据已被删除）。总和是：-1。
第5轮：你可以得到9分。总数是：8。
第6轮：你可以得到-4 + 9 = 5分。总数是13。
第7轮：你可以得到9 + 5 = 14分。总数是27。
注意：

输入列表的大小将介于1和1000之间。
列表中的每个整数都将介于-30000和30000之间。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/baseball-game

#### 思路
- 根据示例画出思路图
<img src="https://upload-images.jianshu.io/upload_images/13129256-1a47f49d9a3551ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>

- 代码
```js
function calPoints(ary) {
  // 使用数组实现 堆栈的数据结构
  let res = []
  // 记录上一轮
  let pre1
  // 记录上上一轮
  let pre2
  ary.forEach(i => {
    switch (i) {
      case 'C':
        res.pop()
        break;
      case 'D':
        // 取出上一轮的值
        pre1 = res.pop()
        // 把上一轮的值 和 本轮的值（前一轮有效 回合得分的两倍）添加到数组中
        res.push(pre1, pre1 * 2)
        break;
      case '+':
        // 上一轮
        pre1 = res.pop()
        // 上上轮
        pre2 = res.pop()
        // 先拿出来的要后方，后拿出来的要先放，栈的规则
        res.push(pre2, pre1, pre2 + pre1)
        break;
      default:
        // * 1 转成 Number
        res.push(i * 1)
        break;
    }
  })
  // 计算数组的和
  return res.reduce((total, count) => total + count)
}
console.log(calPoints(["5","2","C","D","+"])) // 30
console.log(calPoints(["5","-2","4","C","D","9","+","+"])) //27
```
- [点击查看更多内容](https://github.com/sunchang1996/blog)
