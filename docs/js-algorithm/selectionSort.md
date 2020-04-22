# 选择排序

选择排序是一种简单直观的排序算法，无论什么数据进去都是 O(n²) 的时间复杂度
所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。

- 选择排序的思路：
1. 首先在未排序序列中找到最小（或大）元素，存放到排序序列的起始位置。
2. 再从剩余未排序元素中继续寻找最小（或大）元素，然后放到已排序序列的末尾。
3. 重复第二步，直到所有元素均排序完毕。

- 动态演示
![selectionSort.gif](https://upload-images.jianshu.io/upload_images/13129256-d66a91dcbc4d5cf0.gif?imageMogr2/auto-orient/strip)

- 代码：
```js
function selectionSort(arr) {
  const len = arr.length
  let min // 记录最小的值
  let temp

  for (let i = 0; i < len - 1; i++) {
    min = i // 每次取出一个值
    for (let j = i + 1; j < len; j++) {
      // 拿当前的值跟 取出最小的值对比，如果小于它，就替换最小的值
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    // 交换位置
    temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp      
  }
  return arr
}
```
