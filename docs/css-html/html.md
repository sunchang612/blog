# HTML 5新增的属性
## 语义化标签
例如以下几个：
1. header  : 定义了文档的头部区域
2. footer  : 定义了文档的尾部区域
3. nav     : 定义文档的导航
4. section : 定义文档中的节（section、区段）
5. article : 定义页面独立的内容区域
6. aside   : 定义页面的侧边栏内容
7. details: 用于描述文档或文档某个部分的细节
8. summary : 标签包含 details 元素的标题
9. dialog  : 定义对话框，比如提示框

## 增强型表单
HTML5 拥有多个新的表单 input 输入类型
如以下几个：
1. color    主要用于选取颜色
2. date     从一个日期选择器选择一个日期
3. datetime 选择一个日期（UTC 时间
4. datetime-local 选择一个日期和时间 (无时区)
5. email    包含 e-mail 地址的输入域
6. number   数值的输入域
7. range    一定范围内数字值的输入域
8. tel      定义输入电话号码字段
9. url      URL 地址的输入域

HTML5 新增的表单属性
1. placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
2. required  属性，是一个 boolean 属性。要求填写的输入域不能为空
3. pattern 属性，描述了一个正则表达式用于验证 input 元素的值。
4. min 和 max 属性，设置元素最小值与最大值。
5. step 属性，为输入域规定合法的数字间隔。
6. height 和 width 属性，用于 image 类型的 input 标签的图像高度和宽度。
7. autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。
8. multiple 属性 ，是一个 boolean 属性。规定 input 元素中可选择多个值。　　　

## 视频和音频
HTML5 提供了播放音频文件的标准，即使用 audio 元素
```html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  您的浏览器不支持 audio 元素。
</audio>
```
control 属性供添加播放、暂停和音量控件。
在 audio 与 /audio 之间你需要插入浏览器不支持的 audio元素的提示文本 。
audio 元素允许使用多个 source 元素. source 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件
audio 元素支持三种音频格式文件: MP3, Wav, 和 Ogg

HTML5 规定了一种通过 video 元素来包含视频的标准方法
```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  您的浏览器不支持Video标签。
</video>
```
control 提供了 播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法。
同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。
与 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。
video 元素支持多个source 元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）

## Canvas 图形
## SVG 绘图
SVG 是一种使用 XML 描述 2D 图形的语言。
Canvas 通过 JavaScript 来绘制 2D 图形。
SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
Canvas 是逐像素进行

## 地理位置
HTML5 Geolocation（地理定位）用于定位用户的位置。
navigator.geolocation.getCurrentPosition

## 拖放API
拖放的源对象(可能发生移动的)可以触发的事件——3个：
dragstart：拖动开始
drag：拖动中
dragend：拖动结束
整个拖动过程的组成： dragstart*1 + drag*n + dragend*1

拖放的目标对象(不会发生移动)可以触发的事件——4个：
dragenter：拖动着进入
dragover：拖动着悬停
dragleave：拖动着离开
drop：释放
整个拖动过程的组成1： dragenter*1 + dragover*n + dragleave*1
整个拖动过程的组成2： dragenter*1 + dragover*n + drop*1

dataTransfer：用于数据传递的“拖拉机”对象；
在拖动源对象事件中使用e.dataTransfer属性保存数据：
e.dataTransfer.setData( k,  v )
在拖动目标对象事件中使用e.dataTransfer属性读取数据：
var value = e.dataTransfer.getData( k )

## Web Worker

## Web Storage
使用HTML5可以在本地存储用户的浏览数据。早些时候,本地存储使用的是cookies。但是Web 存储需要更加的安全与快速. 这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能。数据以 键/值 对存在, web网页的数据只允许该网页访问使用。
客户端存储数据的两个对象为：
  1. localStorage - 没有时间限制的数据存储
  2. sessionStorage - 针对一个 session 的数据存储, 当用户关闭浏览器窗口后，数据会被删除。

## WebSocket
WebSocket是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。在 WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。
