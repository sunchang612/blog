# 堆 排序
- JavaScript 使用 堆 进行对数组的排序

#### 基本的概念
- 必须是完全二叉树 ((n - 1) 层必须是满二叉树)
- 任意节点的值是其子树所有节点的最大值或最小值
<img src="https://upload-images.jianshu.io/upload_images/13129256-ef64d005d01c8c13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240">

#### 排序的思路
- 堆排序 节点与索引的关系
<img src="https://upload-images.jianshu.io/upload_images/13129256-44f59f131d6ba97f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240">
- 思路：
  1. 先从最后一个节点开始，比较节点数，如果子节点比父节点的大，那么交换位置，否则不动
  <img src="https://upload-images.jianshu.io/upload_images/13129256-7e79f9bd4aa89815.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240">
  2. 如果交换了位置，因为父节点改变，那么要重新构建最大堆
  3. 把根元素取出和最后一个元素交换，再次构建最大堆，重复这个操作，每次都会拿到的数，循环结束后，可以得出一个从小 到 大的排序
  <img src="https://upload-images.jianshu.io/upload_images/13129256-ebdd99e1bdd2d40d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240">

#### 排序
```js
class Heap {
  constructor(data) {
    this.data = data
  }

  sort() {
    let arr = this.data
    let n = arr.length
    if (n <= 1) {
      return arr
    } else {
      // 从最后一个父节点倒叙
      for (let i = Math.floor(n / 2); i >= 0; i--) {
        // 构建最大堆
        Heap.maxHeapify(arr, i, n)
      }

      for (let j = 0; j < n; j++) {
        // 第一个元素和最后一个交换
        Heap.swap(arr, 0, n - 1 - j)
        // 构建最大堆 在上面的基础上 在 - 1， 因为顶点被交换，所有要从 0 开始重新构建
        Heap.maxHeapify(arr, 0, n - 1 - j - 1)
      }
      return arr
    }
  }

  // 交换两个值
  static swap(arr, a, b) {
    if(a === b) {
      return ''
    }
    let c = arr[a]
    arr[a] = arr[b]
    arr[b] = c
  }

  // 构建最大堆
  static maxHeapify(arr, i, size) {
    // 左节点 索引
    let l = i * 2 + 1
    let r = i * 2 + 2

    // 父节点索引
    let largest = i

    // 父节点 i 和 左节点 l 比较 左节点比父节点大 并且都在有效长度 内
    if (l <= size && arr[l] > arr[largest]) {
      largest = l
    }
    // 右节点也一样的操作
    if (r <= size && arr[r] > arr[largest]) {
      largest = r
    }

    // 如果largest改变过，说明需要交换位置
    if(largest !== i) {
      // 交换位置
      this.swap(arr, i, largest)
      // 因为影响了树结构，需要递归再次计算
      this.maxHeapify(arr, largest, size)
    }
  }
}

const res = new Heap([5,4,7,2,8,9,1])
console.log(res.sort())// [1, 2, 4, 5, 7, 8, 9]
```