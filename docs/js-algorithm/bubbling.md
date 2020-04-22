# 冒泡排序

冒泡排序是 JavaScript 基础的排序算法

基本思路：
1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
3. 针对所有的元素重复以上的步骤，除了最后一个。
4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

- 动图演示
![bubbling.gif](https://upload-images.jianshu.io/upload_images/13129256-5a0e564f193b2215.gif?imageMogr2/auto-orient/strip)

- 最后的实现代码
```js
function bubbling(arr) {
  // 根据数组长度，每次递减的方式 循环
  for (let i = arr.length; i > 0; i--) {
    // 每次循环 i 次，随着 i 的值逐渐减小，循环次数变少
    for (let j = 0; j < i; j++) {
      // 如果当前的数字比后一个大，那么他们交换位置
      if(arr[j] > arr[j + 1]) {
        let cur = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = cur
      }          
    }        
  }
  return arr
}

console.log(bubbling([1, 5, 6, 7,9, 8, 3, 2, 4]))
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
