# 时间复杂度是什么？
时间复杂度就是一个函数，用大 O 表示，比如 O(1)、O(n)、O(logN)...
定性描述该算法的运行时间
n
2^n
n^2
n log^2 n

- O(1)
复杂度
```js
let i = 0
i += 1
```
因为每次执行代码文件，永远只会执行一次

- O(n)
```js
for(let i = 0; i <n; i++) {
  console.log(n)
}
```

- O(n^2)
```js
for(let i = 0; i <n; i++) {
  for(let j = 0; j <n; j++) {
    console.log(n)
  }
}
```

- O(logN)
```js
let i = 1
while(i <n) {
  console.log(i)
  i *= 2
}
```
这个题里面 log 就是求 2 的 多少次方 为 n


# 空间复杂度
一个函数，用大 O 表示，比如 O(1) O(n) O(n^2) ...
算法在与运行过程中临时占用存储空间大小的量度

- O(1)
```js
let i = 0
i += 1
```

- O(n)
```js
for(let i = 0; i <n; i++) {
  console.log(n)
}
```

- O(n^2)
```js
const arr = []
for (let i = 0; i < n; i++) {
  arr.push([])
  for (let j = 0; j < n; j++) {
    arr[i].push(j)        
  }
}
```