# 排序链表
- 题目
在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
- 示例
```js
示例 1:

输入: 4->2->1->3
输出: 1->2->3->4
示例 2:

输入: -1->5->3->4->0
输出: -1->0->3->4->5
```
来源：力扣（LeetCode）

### 使用快速排序的方式
- 快速排序的本质： 选一个基准元素，把小于它的放在左边，大于的放在右边，然后使用递归的方式重复这个操作。

### 使用链表的快速排序
```js
// 单项节点列表
// 声明链表节点
class Nodes {
  constructor(value) {
    this.val = value
    // 下一个节点
    this.next = undefined
  }
}

// 声明链表的数据结构
// 原生的 js 没有链表的数据结构

class NodeList {
  constructor(arr) {
    // 声明链头的头部节点
    let head = new Nodes(arr.shift())
    let next = head
    // 循环创建链表的数据结构
    arr.forEach(item => {
      next.next = new Nodes(item)
      next = next.next
    })
    return head
  }
}

// 交换两个节点的值
let swap = (p, q) => {
  let val = p.val
  p.val = q.val
  q.val = val
}

// 寻找基准元素的节点
let partion = (begin, end) => {
  // 开始节点
  let val = begin.val
  // 上指针
  let p = begin
  // 下一个指针位置
  let q = begin.next

  console.log('寻找--->', val, p , q)
  // 如果 有下一个
  while(q !== end) {
    // 如果下一个数，小于当前的 val p 指针指向下一个
    if (q.val < val) {
      // 指针向下移动一位
      p = p.next
      swap(p, q)
    }
    q = q.next
  }
  // 让基准元素跑到中间去
  swap(p, begin)
  return p
}

// 排序
function sortList(begin, end) {
  if (begin !== end) {
    let part = partion(begin, end)
    // 递归左边元素
    sortList(begin, part)
    // 递归右边元素
    sortList(part.next, end)
  }
}
const head = new NodeList(['5', '3', '6', '2', '7', '1', '4'])
```
- <font color=red>constructor return </font> 的意思是 <font color=red> new NodeList 的返回值</font>，如果 <font color=red>return 不是一个对象或构造函数没有 return</font> ，则返回 <font color=red> new NodeList() 自动创建的对象</font>