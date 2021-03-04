# CSS 面试题

## BFC
- 块级格式上下文，页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素互相不影响。创建 BFC 的方式有：
1. HTML 根元素
2. float 浮动
3. 绝对定位 固定定位
4. overflow 不为 visible
5. display 为表格布局或者弹性布局

BFC 主要的作用是：
1. 清除浮动
2. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题
3. 自适应的两列布局（float + overflow）

BFC 特点：
1. 内部 box 在垂直方向，一个接一个的放置
2. box 的垂直方向由 margin 决定，属于同一个 BFC 的两个 box 间的 margin 会重叠
3. BFC 区域不会与 float box 重叠（可用于排版）
4. BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
5. 计算 BFC 的高度时，浮动元素也参与计算（不会浮动坍塌）

BFC 的约束规则：
1. 内部的盒会在垂直方向一个接一个排列
2. 处于同一个 BFC 中的元素互相影响，可能会发生外边距重叠
3. 每个元素的 margin box 的左边与容器块 border box 的左边相接触（对于从左往右格式化，否则相反），即使存在浮动也是如此
4. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外边的元素，反之亦然。
5. 计算 BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
6. 浮动盒区域不叠加到BFC 上
## css3 的新特性
1. 布局更丰富
  - 移动端的崛起，催生了 CSS 媒介查询以及许多响应式布局特性的出现，如图片元素的 srcset 属性，css 的 object-fit 属性。
  - 弹性盒子布局。
  - 格栅布局
2. 视觉上的进度
  - 圆角，阴影和渐变让元素更有质感
  - transform 变换让元素有更多可能。
  - filter 滤镜和混合模式让 web 变成在线的 Photoshop
  - animation 让动画变得非常简单

## 如何清除 浮动
1. clear
2. BFC

注意： clear 只对块级元素有效，clear并不是清除了浮动效果，而是使当前元素盒子的边不能和前面的浮动元素 相邻。

## 怎么让一个 div 水平垂直居中
```html
<div class="parent">
  <div class="child"></div>
</div>
```
- 解决方案
1. flex
```css
div.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
2. 定位
```css
div.parent {
  position: relative; 
}
div.child {
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%);  
}
/* 或者 */
div.child {
  width: 50px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -5px;
}
/* 或 */
div.child {
  width: 50px;
  height: 10px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```
3. grid
```css
div.parent {
  display: grid;
}
div.child {
  justify-self: center;
  align-self: center;
}
```
4. inner-block
```css
div.parent {
  font-size: 0;
  text-align: center;
  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
}
div.child{
  display: inline-block;
  vertical-align: middle;
}
```
## 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

#### 页面结构上
- display: none; 会让元素从渲染树中消失，渲染的时候不占任何空间，不可点击。
- visibility: hidden; 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击。
- opacity: 0; 不会让元素从渲染树中消失，渲染元素继续占据空间，只是内容不可见，可以点击。

#### 继承
- display: none; opacity: 0; 是非继承元素，子孙节点消失由于父元素从渲染树中消失造成，通过修改子孙节点属性无法显示。
- visibility: hidden; 是继承属性，子孙节点消失由于继承了父的 hidden，子孙可通过设置 visibility: visible; 可以让子孙节点显示。

#### 性能
- display: none; 修改元素会造成文档回流，不会读取 display: none; 元素内容，性能消耗较大
- visibility: hidden; 修改元素只会造成元素的重绘，性能消耗较少，读取 visibility: hidden; 元素内容
- opacity: 0; 修改元素会造成重绘，性能消耗较少

## 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

```js
<img src="1.jpg" style="width:480px!important;”>
```

#### 答案
1. 加 max-width
```css
max-width: 300px
```
2. 利用 box-sizing
```css
box-sizing: border-box;
padding: 0 90px;
```
3. 利用 transform 
```css
transform: scale(0.625);
```
4. zoom
```css
zoom: 0.625;
```
5. 利用 js 获取到元素，修改 img 宽度

## img 标签间距问题的原理以及如何解决
#### 问题：
- 众所周知，多个img并列显示时会有几像素间距，但是这并不是img标签特有的特性。将div设置为inline-block属性之后，div标签之间也会存在间距。
#### 内部原理
- 实际上，所有display属性为inline ， inline-block 的盒模型都会有文字特性，间距就是由于两个标签之间的空白引起的。

#### 常用的解决方案
1. 删除标签之间的空格
```html
<img src='1.png'/><img src='2.png'>
```

2. 将父级设置为font-size: 0px
```html
<div style="font-size: 0px">
  <img src="img/1.jpg" alt="">
  <img src="img/2.jpg" alt="">
  <img src="img/3.jpg" alt="">
  <img src="img/4.jpg" alt="">
  <img src="img/5.jpg" alt="">
</div>
```
3. 设置为使用负margin去除边距
```html
<style>
img {
  margin-left: -8px;
}
</style>
<img src="img/1.jpg" alt="">
<img src="img/2.jpg" alt="">
<img src="img/3.jpg" alt="">
<img src="img/4.jpg" alt="">
<img src="img/5.jpg" alt="">
```

4. 设置浮动
```html
<style>
img {
  float: left;
}
</style>
<img src="img/1.jpg" alt="">
<img src="img/2.jpg" alt="">
<img src="img/3.jpg" alt="">
<img src="img/4.jpg" alt="">
<img src="img/5.jpg" alt="">
```

## CSS 选择器以及这些原则器的优先级
1. !important  in po nei te
2. 内联样式  1000
3. ID 选择器 100
4. 类选择器、属性选择器、伪类选择器 10
5. 元素选择器、关系选择器、伪元素选择器 1
6. 通配符选择器（*） 0000


## 了解盒子模型吗
盒子的包含的区域：内容区域、内边距区域、边框区域和外边距区域。

#### box-sizing
- content-box（W3C盒子模型） : 元素的宽高大小表现为``内容``的大小。
- border-box(IE盒子模型)： 元素的宽高大小表现为 `内容+内边距+边框`的大小。

用来控制元素的盒子模型的解析模式，默认为content-box，<font color='red'>但一般使用时都是用 border-box</font>
context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽
border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽

## CSS 三列布局中间自适应
1. 使用定位的方式
左右两个使用定位分别固定在左右两边，中间内容撑开，设置margin左右两边的距离
```js
 <div class="container">
  <div class="left border">左边左边左边左边左边左边左边左边</div>
  <div class="middle border">中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间</div>
  <div class="right border">右边右边右边右边右边右边右边右边右边</div>
</div>
```
```css
.left, .right {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0px;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.middle {
  margin: 0 100px 0 100px;
}
```
2. 圣杯布局：必须将中间部分的HTML结构写在最前面，三个元素均设置向左浮动。两侧元素宽度固定，中间设置为100%；然后利用左侧元素负的margin值进行偏移，覆盖在中间的宽度之上；右侧的元素同样利用负的margin值进行覆盖，缺点：不能自适应高度
```html
<div class="wrap">
  <div class="left">左侧</div>
  <div class="middle">中间</div>
  <div class="right">右侧</div>
</div>
```
```css
.middle {
  float: left; 
  width: 100%; 
  height: 100px; 
  background: lightblue;
}
.main {
  margin: 0 140px 0 220px; 
  background: lightpink;
}
.left {
  float: left; 
  width: 200px; 
  height: 100px; 
  background: coral; 
  margin-left: -100%;
}
.right {
  float: left;
  width: 120px;
  height: 100px; 
  margin-left: -120px;
}
```
3. position
基于绝对定位的三栏布局：注意绝对定位的元素脱离文档流，相对于最近的已经定位的祖先元素进行定位。无需考虑HTML中结构的顺序
左右两边绝对定位，中间使用 margin 控制两边间距
```css
  .left {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    background: coral;
  }
  .right {
    width: 120px;
    height: 100px;
    position: absolute;
    top:0; right: 0;
    background: lightblue;
  }
  .middle {
    height: 50px;
    margin: 0 140px 0 220px;
    background: #555;
  }
```
4. flex
将父元素设置为 flex 左右两边固定宽度，justify-content: space-between; 或者 flex: 1


### 让一个元素上下左右居中
```html
<div class='wrapper'>
  <div class='box'></div>
</div>
```
1. absolute + transform：translate
```css
.box {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid red;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```
2. absolute l,r,b,t = 0 + margin: auto
```css
.box {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid red;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

3. flex
```css
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

4. margin-left -宽高的一半
```css
.box {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

5. grid
```css
.wrapper {
  height: 100%;
  display: grid;
}
.box {
  justify-self: center;
  align-self: center;
}
```

6. 利用 ::before
```css
.wrapper {
  text-align: center;
}
.wrapper::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.box {
  display: inline-block;
  vertical-align: middle;
}
```

7. flex + margin
```css
.wrapper {
  display: flex;
}
.box {
  margin: auto;
}
```

8. grid + margin
```css
.wrapper {
  display: grid;
}
.box {
  margin: auto;
}
```

### 弹性盒子中 flex: 0 1 auto 表示什么意思
flex 的三个参数分别是
1. flex-grow ：属性定义项目的放大比例，默认是0，即如果存在剩余空间，也不放大。
    如：父元素 300，子A 100，子B 100，剩余空间 100
    如果此时设置 flex-grow: 1
    那么A就是 100 + 100* 1/2 = 150 B 也是同样的
2. flex-shrink：属性定义了项目的缩小比例，默认是1，即如果空间不足，该项目将缩小
    父400px,A 200px B 300px
    AB总宽度超出父元素100px;
    如果A不减少，则flex-shrink ：0,B减少；
3. flex-basis：属性定义了在分配多余空间之前，项目占据的主轴空间（），设置了宽度跟宽度走，没设置宽度跟内容实际宽度走
    该属性用来设置元素的宽度，当然 width 也可以用来设置元素的宽度，如果设置了width和flex-basis，那么flex-basis会覆盖width值。

默认值为 0 1 auto

flex:1 表示: flex-grow: 1; flex-shrink: 1; flex-basis: 0%

### 求最终 left、right 的宽度
```html
<div class="container">
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 500px;
    background: red;
  }
  .right {
    flex: 2 1 400px;
    background: blue;
  }
</style>
```
有一个公式: 
子项的收缩宽度 = 子项收缩比例 * 溢出宽度
子项收缩比例 = (子项宽度 * 子项收缩系数(flex-shrink)) / 所有子项的(宽度 * 收缩系数) 之和

如上面的例子:
子项的收缩宽度： (500 + 400) - 600 = 300

`这里的 = 都是约等于`
left 收缩比例：500 * 2 / (500 * 2 + 400 * 1) = 0.7142
right 收缩比例：400 * 1 / (500 * 2 + 400 * 1) = 0.2857

对应的
  left 收缩宽度: 300 * 0.7142 = 214.26
  right 收缩宽度：300 * 0.2857 = 85.71

最后实际的宽度
  left: 500 - 214.26 = 285.74
  right: 400 - 87.71 = 314.29