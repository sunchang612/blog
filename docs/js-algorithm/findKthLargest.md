# 数组中的第K个最大元素

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
```js
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```
示例 2:
```js
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```
说明:
你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

- 仔细读题和示例，这个题很简单，题目中已经说了需要排序，然后从示例中可以看出，是从大到小的排序（从示例1中看出，输出是5，从大到小的排序中，第二个正好是 5）

##### 先用 sort 实现
```
function findKthLargest(ary, key) {
  return ary.sort((a, b) => b - a)[key - 1]
}
```

##### 用冒泡排序的方式
- `注意` 这里用冒泡排序不用遍历所有之后，在取出第 key 个值，可以直接排序中实现
> 因为冒泡排序每次都会把最大值，放到最后，我们只要排序到要找的那个 key 值，然后返回就可以了，不用排序所有的值

```
function findKthLargest(ary, key) {
  const len = ary.length - 1
  for (let i = len; i > len - key; i--) {
    for (let j = 0; j < i; j++) {
      if (ary[j] > ary[j + 1]) {
        const tem = ary[j]
        ary[j] = ary[j + 1]
        ary[j + 1] = tem
      }
    }
  }
  // 为什么要 + 1 - key
  // 因为：是正序排列，找出第 key 个大的数，要找出 key 的索引位置取出
  // 例如：const a =[1,2,3,4] 找出第3大的，结果是 2，这种写法就是 a[a.length - 3] 结果一样是 2
  return ary[len + 1 - key]
}
console.log(findKthLargest([5,1,16, 9, 6], 2)) // 9

```

