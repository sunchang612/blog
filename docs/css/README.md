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

BFC 特点：
1. 内部 box 在垂直方向，一个接一个的放置
2. box 的垂直方向由 margin 决定，属于同一个 BFC 的两个 box 间的 margin 会重叠
3. BFC 区域不会与 float box 重叠（可用于排版）
4. BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
5. 计算 BFC 的高度时，浮动元素也参与计算（不会浮动坍塌）

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

注意： clear 只对块级元素有效，clear并不是清除了浮动效果，而是使当前元素盒子的边不能喝前面的浮动元素 相邻。

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

