### 什么是栈
一个 后进先出 的数据结构
JS 一个可以模拟栈

### 模拟入栈和出栈
```js
const stack = [] // 模拟栈
stack.push(1) // 入栈
stack.pop() // 出栈
```
### 使用场景
函数调用堆栈

### 括号表达式
```js
/* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

思路：
  新建一个栈
  扫描字符串，遇到左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接判定不合法。
  最后栈空了就合法，否则就不合法
*/

var isValid = function (s) {
  const stack = []

  for(let i = 0; i < s.length; i ++) {
    const c = s[i]
    if (['(', '[', '{'].includes(c)) {
      stack.push(c)
    } else {
      const t = stack[stack.length - 1]
      if (
        c === ')' && t === '(' ||
        c === '}' && t === '{' ||
        c === ']' && t === '['
      ) {
        stack.pop()
      } else {
        return false
      }
    }
  }

  return stack.length === 0
}
```