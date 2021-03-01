# 树是什么
一种 分层 数据的抽象模型
前端工作中常见的树包括： DOM ，级联选择、树形控件

- js 中没有树，可以用 Object 和 Array 构建树
- 树的常用操作： 深度/广度优先遍历、先中后序遍历。

示例数据:
  ```js
    const obj = {
      val: 'a',
      children: [
        {
          val: 'b',
          children: [
            {
              val: 'c',
              children: []
            }
          ]
        },
        {
          val: 'd',
          children: [
            {
              val: 'e',
              children: [
                {
                  val: 'f',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ```
- 广度优先遍历： 先访问离根节点最近的节点
  1. 新建一个队列，把根节点入队
  2. 先把对头出队并访问
  3. 把对头的 children 挨个入队
  4. 重复 二 三 直到队列为空

  ```js
    const bfs = (root) => {
      const q = [root]
      while(q.length > 0) {
        const n = q.shift()
        console.log(n.val)
        n.children.forEach((child) => {
          q.push(child)
        })
      }
    }
    bfs(obj)
  ```
- 深度优先遍历： 尽可能深的搜索树的分支
  访问根节点
  对根节点的 children 挨个进行深度优先遍历
  ```js
    const dfs = (root) => {
      console.log(root.val)
      root.children.forEach(dfs)
    }
  ```

  案例数据: 
  ```js
  const bt = {
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4,
        left: null,
        right: null
      },
      right: {
        val: 5,
        left: null,
        right: null
      }
    },
    right: {
      val: 3,
      left: {
        val: 6,
        left: null,
        right: null
      },
      right: null
    }
  }
  ```
- 先序遍历算法
  1. 访问根节点
  2. 对根节点的左子树进行先序遍历
  3. 对根节点的右子树进行先序遍历
  ```js
  const preorder = (root) => {
    if (!root) return
    console.log(root.val)// 124536
    preorder(root.left)
    preorder(root.right)
  }
  ```

- 中序遍历算法
  1. 对跟节点的左子树进行中序遍历
  2. 访问根节点
  3. 对根节点的右子树进行中序遍历
  ```js
    const inorder = (root) => {
      if (!root) return
      inorder(root.left)
      console.log(root.val)
      inorder(root.right)
    }
    console.log(inorder(bt)) // 425163
  ```

- 后序遍历算法
  1. 对根节点的左子树进行后序遍历。
  2. 对根节点的右子树进行后序遍历
  3. 访问根节点。
  ```js
  const postorder = (root) => {
    if (!root) return
    postorder(root.left)
    postorder(root.right)
    console.log(root.val) // 452631
  }
  ```

## 非递归版
  - 先序遍历算法
  ```js
    const preorder = (root) => {
      if (!root) return
      // console.log(root.val)
      // preorder(root.left)
      // preorder(root.right)
      const stack = [root]
      while(stack.length) {
        const n = stack.pop()
        console.log(n.val) // 124536
        // 因为栈是先进后出，所以如果先 left出 就先进 right
        if(n.right) stack.push(n.right)
        if(n.left) stack.push(n.left)
      }
    }
  ```
  - 中序版算法
  ```js
  const inorder = (root) => {
    if (!root) return
    // inorder(root.left)
    // console.log(root.val)
    // inorder(root.right)
    const stack = []
    let p = root
    while(stack.length || p) {
        while(p) {
          stack.push(p)
          p = p.left
        }
        const n = stack.pop()
        console.log(n.val)
        p = n.right
    }
  }
  ```

  - 后序遍历算法
  ```js
  const postorder = (root) => {
    if (!root) return
    // postorder(root.left)
    // postorder(root.right)
    // console.log(root.val)
    
    // 首先利用选项的算法逻辑线逆序， 
    const outStack = []
    const stack= [root]
    while(stack.length) {
      const n = stack.pop()
      outStack.push(n)
      if (n.left) stack.push(n.left)
      if (n.right) stack.push(n.right)
    }
    // 然后利用栈把数据倒序出来
    while(outStack.length) {
      const n = outStack.pop()
      console.log(n.val)
    }
  }
  ```