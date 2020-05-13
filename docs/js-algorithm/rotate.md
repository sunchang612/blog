# 旋转图像
给定一个 *n *× *n* 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

**说明：**

你必须在**[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)**旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要**使用另一个矩阵来旋转图像。
- 示例 1:
```js
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```
- 示例 2:
```js
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/rotate-image
![分析图.png](https://upload-images.jianshu.io/upload_images/13129256-6189a7523f60a121.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 代码
```js
function rotate(ary) {
  let vector = ary.length
  // 垂直替换
  debugger
  for (let i = 0, len = vector / 2; i < len; i++) {
    for (let j = 0; j < vector; j++) {
      // 以中心轴进行交换
      let cur = ary[i][j]
      // ary[vector - i - 1][j] 数组长度 - 当前循环列 - 1 (在减一因为索引是从 0 开始的)
      ary[i][j] = ary[vector - i - 1][j]
      ary[vector - i - 1][j] = cur
    }        
  }
  // 以对角线进行交换
  for (let i = 0; i < vector; i++) {
    for (let j = 0; j < i; j++) {
      let cur = ary[i][j]
      // ary[i][j] 和 ary[j][i]，因为 j 会比 i 小一个数，所有获取时调换 位置，可以让数组斜对角交换
      ary[i][j] = ary[j][i]
      ary[j][i] = cur
    }        
  }
  return ary
}

console.log(rotate([
  [1,2,3],
  [4,5,6],
  [7,8,9]
]))
console.log(rotate([
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]))
```