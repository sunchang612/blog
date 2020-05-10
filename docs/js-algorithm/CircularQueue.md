# 设计循环队列

### 队列
- 是一种特殊的线性表，它只允许在表的前端进行删除操作，而在表的后端进行插入操作，和栈一样，队列是一种操作受限制的线性表。（特点：先进先出）

- 题目：
> 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

- 你的实现应该支持如下操作：
  - MyCircularQueue(k): 构造器，设置队列长度为 k 。
  - Front: 从队首获取元素。如果队列为空，返回 -1 。
  - Rear: 获取队尾元素。如果队列为空，返回 -1 。
  - enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
  - deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
  - isEmpty(): 检查循环队列是否为空。
  - isFull(): 检查循环队列是否已满。

- 示例：
```js
rcularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3

circularQueue.enQueue(1);  // 返回 true

circularQueue.enQueue(2);  // 返回 true

circularQueue.enQueue(3);  // 返回 true

circularQueue.enQueue(4);  // 返回 false，队列已满

circularQueue.Rear();  // 返回 3

circularQueue.isFull();  // 返回 true

circularQueue.deQueue();  // 返回 true

circularQueue.enQueue(4);  // 返回 true

circularQueue.Rear();  // 返回 4

```
来源：力扣（LeetCode）

- 直接上代码
#### ES5 版
```js
function MyCircularQueue (k) {
  // 保存长度 为 k 的数据结构
  this.list = Array(k)
  // 对首的指针
  this.front = 0
  // 队尾的指针
  this.rear = 0
  // 对列的长度
  this.max = k
}

// 向循环队列插入一个元素。如果成功插入则返回真。否则返回 false
MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) {
    return false
  } else {
    this.list[this.rear] = value
    // 把指针 + 1， % 因为指针到末尾后，要在重新指回到第一个
    this.rear = (this.rear + 1) % this.max
    return true
  }
}
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
MyCircularQueue.prototype.deQueue = function() {
  // 取出第一个元素
  const f = this.list[this.front]
  // 删除元素
  this.list[this.front] = ''
  // 同样的道理 front 的指针 + 1
  this.front = (this.front + 1) % this.max
  // 返回元素
  return !!f
}

// Front: 从队首获取元素。如果队列为空，返回 -1 。
MyCircularQueue.prototype.Front = function() {
  return this.list[this.front] ? this.list[this.front] : -1
}

// Rear: 获取队尾元素。如果队列为空，返回 -1 。
MyCircularQueue.prototype.Rear = function() {
  if (this.isEmpty()) {
    return -1
  } else {
    // 获取 index
    const rear = this.rear - 1
    // 判断当前的 index
    const cur = rear < 0 ? this.max - 1 : rear
    return this.list[cur]
  }
}

// isEmpty(): 检查循环队列是否为空。
MyCircularQueue.prototype.isEmpty = function() {
  // 两个指针相同，并且元素为空
  return this.front === this.rear && !this.list[this.front]
}
// isFull(): 检查循环队列是否已满。
MyCircularQueue.prototype.isFull = function() {
  return this.front === this.rear && !!this.list[this.front]
}
const circularQueue = new MyCircularQueue1(3)
console.log(circularQueue.enQueue(1)) // true
console.log(circularQueue.enQueue(2)) // true
console.log(circularQueue.enQueue(3)) // true
console.log(circularQueue.enQueue(4)) // false
console.log(circularQueue.Rear(4)) // 3
console.log(circularQueue.Front(4)) // true
console.log(circularQueue.deQueue(4)) // true
console.log(circularQueue.enQueue(4)) // true
console.log(circularQueue.Rear(4)) // 4
```

#### ES6 版
```js
class MyCircularQueue1 {
  constructor(k) {
    this.list = Array(k)
    this.front = 0
    this.rear = 0
    this.max = k
  }

  enQueue(value) {
    if (this.isFull()) {
    return false
    } else {
      this.list[this.rear] = value
      this.rear = (this.rear + 1) % this.max
      return true
    }
  }

  deQueue() {
    const f = this.list[this.front]
    this.list[this.front] = ''
    this.front = (this.front + 1) % this.max
    return !!f
  }

  Front() {
    return this.list[this.front] ? this.list[this.front] : -1
  }

  Rear() {
    if (this.isEmpty()) {
      return -1
    } else {
      // 获取 index
      const rear = this.rear - 1
      // 判断当前的 index
      const cur = rear < 0 ? this.max - 1 : rear
      return this.list[cur]
    }
  }

  isEmpty() {
    return this.front === this.rear && !this.list[this.front]
  }

  isFull() {
    return this.front === this.rear && !!this.list[this.front]
  }
}
const circularQueue1 = new MyCircularQueue1(3)

console.log(circularQueue1.enQueue(1)) // true
console.log(circularQueue1.enQueue(2)) // true
console.log(circularQueue1.enQueue(3)) // true
console.log(circularQueue1.enQueue(4)) // false
console.log(circularQueue1.Rear(4)) // 3
console.log(circularQueue1.Front(4)) // true
console.log(circularQueue1.deQueue(4)) // true
console.log(circularQueue1.enQueue(4)) // true
console.log(circularQueue1.Rear(4)) // 4
```
