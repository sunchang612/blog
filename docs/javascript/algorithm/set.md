# 集合是什么
一种 “无序且唯一” 的数据结构

js 中使用 SE6  中的集合 Set

使用场景：去重、判断某元素是否在集合中，求交集

- 去重
```js
const arr = [1,2,3,1,2]
const arr2 = [...new Set(arr)]
```

- 判断元素是否在集合中
```js
const set = new Set(arr)
const has = set.has(3)
```

- 求交集
```js
const set2 = new Set([2, 3])
const set3 = new Set([...set].filter(item => set.has(item)))
```