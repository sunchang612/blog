# 链表是什么
- 多个元素组成的列表
- 元素存储不连续，用 next 指针连在一起

## 链表 VS 数组
- 数组：增删非首尾元素时往往需要移动元素。
- 链表：增删非首尾元素，不需要移动元素，只需要更改 next 的指向即可。

## 链表的基本使用
JavaScript 中可以用 Object 模拟链表

```js
const a = {val : 'a'}
const b = {val : 'b'}
const c = {val : 'c'}

a.next = b
b.next = c

// 遍历链表
let p = a
while(p) {
  console.log(p.val)
  p = p.next
}

// 插入，插入到 b 和 c 之间
const e = {val: 'e'}
b.next = e
e.next = c

// 删除 重新改变链表指向 这里删除了 e
b.next = c

```
