# 对称二叉树
 - 题目
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
```js
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```js
    1
   / \
  2   2
   \   \
   3    3
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/symmetric-tree

- 二叉树的结构，如下图
  <img src="https://upload-images.jianshu.io/upload_images/13129256-8d3e2e61699906c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="二叉树结构">

#### 首先构建二叉树结构
```js
class Nodes {
  constructor(value) {
    this.value = value
    // 左右节点
    this.left = this.right = undefined
  }
}

 // 构建二叉树数据结构
class Tree {
  constructor(data) {
    // 临时存储所有节点
    let nodeList = []
    // 顶节点
    let root
    for (let i = 0; i < data.length; i++) {
      // 数据变成节点
      let node = new Nodes(data[i])          
      nodeList.push(node)
      if(i > 0) {
        // 计算当前节点属于哪一层，详细请看文章末尾
        let n = Math.floor(Math.sqrt(i+1))

        // 当前层的起始值 因为每层是 2 n 的平方
        let f = Math.pow(2, n) - 1
        // 记录上一层的起始点
        let p = Math.pow(2, n - 1) - 1

        // 找到当前节点的父节点
        let parent = nodeList[p + Math.floor((i - f) / 2)]
        // console.log(parent)
        // 把当前节点和 上一层的父节点关联起来
        // 判断是否有左节点，已有那就复制给又节点，因为二叉树只有左右两个节点
          if(parent.left) {
            parent.right = node
          } else {
            parent.left = node
          }
      }
    }
    // 取出第一个根节点
    root = nodeList.shift()
    nodeList.length = 0
    return root
  }
}
```
#### 解释上面代码中几种计算 的意思
1.  Math.floor(Math.sqrt(i+1)) 计算当前是第几层
  - 每层计算是居于当前数 index + 1 然后平方根 后，向下取整得到
  ```js
    例如数组为 
    [0, 1,2,3,4,5,6]
    循环遍历数组，当 index > 0 时开始计算，因为第一个是根
    第二层： 1 ，2  Math.floor(Math.sqrt(i+1))   计算有结果是 1
    第三层：3， 4， 5， 6  计算后结果是 2  

  ```
  <img src="https://upload-images.jianshu.io/upload_images/13129256-1e59e3bdfa3b0a40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="分析二叉树">

2. Math.pow(2, n) - 1   ·当前层·  和 Math.pow(2, n - 1) - 1   ·上一层·
  - 如上图所示，每层数量是 2 * 当前层级， 而计算起始点要 - 1 因为数组是从 0 开始的

3. nodeList[p + Math.floor((i - c) / 2)] 寻找父节点 
  - p 表示上一层的起始点，c 当前层的起始点,  i 数组的 index
  -  找出 5 和 6  的父节点
    - 5 的 i 是 5， c 是 3， p 是 1， ---》 结果是 2
  - 3 和 4 的父节点
    - 3 -> i 是 3， c 是 3 ， p 是 1    ----》 结果是 1
#### 验证二叉树是否对称
- 如图，把每个节点分成如下方式，分别验证左右是否相同
```JS
  // 验证对称 二叉树
  // 递归把 二叉树的 左右节点比较
  static isSymmetry(root) {
    if (!root) {
      return false
    }
    let verify = (left, right) => {
      if (!left && !right) {
        return true
      }
      // 左或右 没有，或者 左右 的值不相等
      if ((left && !right) || (!left && right) || (left.value !== right.value)) {
        return false
      }
      return verify(left.left, right.right) && verify(left.right, right.left)
    }

    return verify(root.left, root.right)
  }
```
  <img src="https://upload-images.jianshu.io/upload_images/13129256-7a3b36cb006016b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="校验对称二叉树">

#### 最后所有代码
```js
class Nodes {
  constructor(value) {
    this.value = value
    // 左右节点
    this.left = this.right = undefined
  }
}

// 构建二叉树数据结构
class Tree {
  constructor(data) {
    // 临时存储所有节点
    let nodeList = []
    // 顶节点
    let root
    for (let i = 0; i < data.length; i++) {
      // 数据变成节点
      let node = new Nodes(data[i])          
      nodeList.push(node)
      if(i > 0) {
        // 计算当前节点属于哪一层，
        let n = Math.floor(Math.sqrt(i+1))

        // 当前层的起始点 因为每层是 2 n 的平方
        let c = Math.pow(2, n) - 1
        // 记录上一层的起始点
        let p = Math.pow(2, n - 1) - 1

        // 找到当前节点的父节点
        console.log(p + Math.floor((i - c) / 2))
        let parent = nodeList[p + Math.floor((i - c) / 2)]
        // console.log(parent)
        // 把当前节点和 上一层的父节点关联起来
        // 判断是否有左节点，已有那就复制给又节点，因为二叉树只有左右两个节点
        // if (parent) {
          if(parent.left) {
            parent.right = node
          } else {
            parent.left = node
          }
        // }
      }
    }
    // 取出第一个根节点
    root = nodeList.shift()
    nodeList.length = 0
    return root
  }

  // 验证对称 二叉树
  // 递归把 二叉树的 左右节点比较
  static isSymmetry(root) {
    if (!root) {
      return false
    }
    let verify = (left, right) => {
      if (!left && !right) {
        return true
      }
      // 左或右 没有，或者 左右 的值不相等
      if ((left && !right) || (!left && right) || (left.value !== right.value)) {
        return false
      }
      return verify(left.left, right.right) && verify(left.right, right.left)
    }

    return verify(root.left, root.right)
  }
}

const res = new Tree([1,2,2,3,4,4,3])
console.log(res)
console.log('校验二叉树', Tree.isSymmetry(res)) // true
```