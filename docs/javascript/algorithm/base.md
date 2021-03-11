# 基础的排序算法

## 冒泡排序
```js
/**
 * 冒泡排序的思路
 * 比较所有相邻元素，如果第一个比第二个大，交换位置
 * 一轮下来，可以保证第一个或最后一个是最大或最小的
 * 执行 n- 1 轮，就可以完成排序
 * 
 * 时间复杂度：O(n^2)
 */

function mapPao(list) {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = 0; j < list.length - 1 - i; j++) {
      const d = list[j]
      if (list[j] > list[j + 1]) {
        const e = list[j]
        list[j] = list[j + 1]
        list[j + 1] = e
      }
    }
  }
  return list
}

console.log(mapPao([2,1,4,5,6,2,13,5]))
```

## 插入排序
```js
/**
 * 插入排序
 * 从第二个数开始往前比
 * 比它大就往后排
 * 以此类推进行到最后一个数
 * 
 * O(n^2)
 */
const arr = [1,4,6,2,3,4,8,9,1]
for (let i = 1; i < arr.length; i++) {
  let c = arr[i]
  let j = i
  while(j > 0) {
    if (arr[j - 1] > c) {
      arr[j] = arr[j - 1]
    } else {
      break
    }
    j --
  }
  arr[j] = c
}

console.log(arr)
```

## 快速排序
```js
/**
 * 分区：从数组中任意选择一个 “基准”，所有比它小的元素放到前面，
 *      比它大的与放到后面
 * 递归：递归的对基准前后的子数组进行分区操作
 * 
 * 时间复杂度：
 *  分区：O(n)
 *  递归：O(logN)
 * O(n * logN)
 */

const quickSort = (array) => {
  const rec = (arr) => {
    if (arr.length === 0) return arr
    const left = []
    const right = []
    const mid = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    // return rec(left).concat(mid, rec(right))
    return [...rec(left), mid, ...rec(right)]
  }
  console.log(array)
  return rec(array)
}
console.log(quickSort([3,4,5,7,8,9,2,3,5]))
```

## 选择排序
```js
/**
 * 选择排序的思路
 * 找到数组中的最小值，选中它并将其放置到第一位
 * 找到数组中的第二小值，放到第二位
 * 以此类推，执行 n - 1 轮
 * 时间复杂度 O(n ^ 2)
 */

const arr = [6,4,7,2,9,1,0,6]
for (let i = 0; i < arr.length - 1; i++) {
  let minIndex = i
  for (let j = i; j < arr.length; j++) {
    if (arr[j] < arr[minIndex]) {
      minIndex = j
    }
  }
  if (minIndex !== i) {
    const t = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = t
  }
}

console.log(arr)
```

## 归并排序
```js
/**
 * 分：把数组劈成两半，在递归对子数组进行 “分” 操作，
 *    直到分成一个个单独的树
 * 合：把两个树合并为有序数组，在对有序数组进行合并，
 *   直到全部子数组合并成一个完整数组
 * 
 * 时间复杂度
 *  分：O(logN)
 *  合：O(n)
 * 
 * O(n*log)
 */

const mergeSort = function (arr) {
  const res = (arr) => {
    if(arr.length === 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid, arr.length)
    const orderLeft = res(left)
    const orderRight = res(right)

    const r = []
    while(orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        r.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
      } else if (orderLeft.length) {
        r.push(orderLeft.shift())
      } else if (orderRight.length){
        r.push(orderRight.shift())
      }
    }
    return r
  }
  return res(arr)
}

console.log(mergeSort([1,4,5,7,8,9,2,3,5]))
```

## 二分搜索
```js
/**
 * 二分搜索的前提是数组是有序的
 * 
 *  从数组的中间元素开始，如果正好是目标值，直接返回索引结束。
 *  如果目标值小于或者大于中间元素，则在小于或者大于中间元素那
 *  一半数组中搜索
 * 
 * 时间复杂度
 *  因为每次比较都使搜索范围缩小一半
 *  O(logN)
 */

Array.prototype.binarySearch = function (item) {
  let low = 0 // 最小下标
  let high = this.length - 1 // 最大下标
  // 不断的修改搜索范围，每次都会缩小
  while(low <= high) {
    // 中间值
    const mid = Math.floor((low + high) / 2)
    const ele = this[mid]
    // 如果目标值大于中间值
    if (ele < item) {
      // 搜索最大目标
      low = mid + 1
    } else if (ele > item) {
      // 搜索最小部分数组，最大小标肯定是 中间值 -1
      high = mid -1
    } else {
      // 如果相等，直接返回
      return mid
    }
  }
  return -1
}
console.log([1,2,3,4,5,6,7,8,9].binarySearch(7))
```

## 顺序搜索
```js
/**
 * 遍历数组
 * 找到跟目标值相等的元素怒，就返回它的的下标
 * 遍历后如果没有找到，就返回 -1
 * 
 * O(n)
 */

function search(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return i
    }
  }
  return -1
}



Array.prototype.searchSort = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

console.log(search([3,4,5,7,8,9,2,3,5], 5))
console.log([3,4,5,7,8,9,2,3,5].searchSort(5))
```
