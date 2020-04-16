# JavaScript 算法（卡牌分组）
给定一副牌，每张牌上都写着一个整数。

此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

每组都有 X 张牌。
组内所有的牌上都写着相同的整数。
仅当你可选的 X >= 2 时返回 true。
示例 1：
```
  输入：[1,2,3,4,4,3,2,1]
  输出：true
  解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
```
示例 2：
```  
输入：[1,1,1,2,2,2,3,3]
输出：false
解释：没有满足要求的分组。
```
示例 3：
```
输入：[1,1]
输出：true
解释：可行的分组是 [1,1]
```
示例 4：
```
输入：[1,1,2,2,2,2]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[2,2]
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards

思路:
1. 拿到数组先进行排序（升序和降序都可以）
2. 循环遍历数组，先拿第一位和第二位数进行比较，依次类推，在拿第二位数和第三位数比较。最后形成一个二维数组
![image.png](https://upload-images.jianshu.io/upload_images/13129256-9587e1bb469a397c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 判断每个数组是否是 最小length 的倍数
```
  const isSuccess = dist.every(i => i.length % min === 0)
```
最后的代码:
```
function cardNumber(ary) {
  // 先把数组排序
  const resort = ary.sort((a, b) => a - b)
  // Number.MAX_SAFE_INTEGER 的意思是  JavaScript 中最大的安全整数
  let min = Number.MAX_SAFE_INTEGER
  const dist = []
  for (let i = 0; i < resort.length; i++) {
    // 临时存储变量的数组, 记录第一个元素
    let tem = []
    tem.push(resort[i])
    // 从第二个开始
    for (let j = i + 1; j < resort.length + 1;) {
      // 如果下一个数字，跟上一个数字相同，存储到临时分组中
      if (resort[j] === resort[i]) {
        tem.push(resort[j])
        // 让 j++ 走执行下一步骤
        j++
      } else {
        // 如果当前分组个数，小于临时数组个数
        if (min > tem.length) {
          min = tem.length
        }
        dist.push(tem)
        tem = null
        // 让 i 从 当前 j 的位置开始
        // 这里不能直接等于 j ，因为上面还要执行 i ++ 所以要 j - 1
        i = j - 1
        j++ // 这里好像并没有必要了, 因为下面已经 break 了
        break;
      }
    }
  }
  console.log(dist)
  const isSuccess = dist.every(i => i.length % min === 0)
  return isSuccess
}
const result2 = cardNumber([1,2,3,4,4,4,4,3,2,1])
console.log(result2) // true
```
![image.png](https://i.guancha.cn/news/social/2020/01/20/20200120150924175.jpg)

```但是：```
- 上面的代码还是有问题了，比如 如果最小 length 是 1 ，那就...

最后稍微严禁的代码：
```
function cardNumber(ary) {
  // 当 数组的长度小于 2 ，就直接 返回 false
  if (ary.length < 2) return false
    // 先把数组排序
  const resort = ary.sort((a, b) => a - b)
  // Number.MAX_SAFE_INTEGER 的意思是  JavaScript 中最大的安全整数
  let min = Number.MAX_SAFE_INTEGER
  const dist = []
  for (let i = 0; i < resort.length; i++) {
    // 临时存储变量的数组, 记录第一个元素
    let tem = []
    tem.push(resort[i])
    // 从第二个开始
    for (let j = i + 1; j < resort.length + 1;) {
      // 如果下一个数组，跟上一个数字相同，存储到临时分组中
      if (resort[j] === resort[i]) {
        tem.push(resort[j])
        j++
      } else {
        // 这里加一个 ，如果临时数组小于 2 ，就没有必要往下走了，直接 return false
        if (tem.length < 2) { 
          return false
        }
        // 如果当前分组个数，大于临时数组个数
        if (min > tem.length) {
          min = tem.length
        }
        dist.push(tem)
        tem = null
        // 让 i 从 当前 j 的位置开始
        // 这里不能直接等于 j ，因为上面还要执行 i ++ 所以要 j - 1
        i = j - 1
        break;
      }
    }
  }
  console.log(dist)
  const isSuccess = dist.every(i => i.length % min === 0)
  return isSuccess
}

```
每天进步一点点

