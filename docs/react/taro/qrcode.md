# 小程序动态生成带参数的二维码

## 前景
- 最近用 taro 搞小程序要动态生成二维码，需要加二维码里面添加不同的参数，看了一下[微信小程序码](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/qr-code.html)提供的几种方案，我的使用场景用到第二个 B 方案，但它的参数有限制，只能 32 的字符

### 前端调用生成
- 调用服务端接口，在 scene 里面传入参数，因为有字符限制，我的参数较多，把参数名尽量的简写
```js
 const { data } = await request.post(xxxx, {
    scene: `c=xxx&p=2&g=123`,
    width: 280
 })
```
- 参数
![image.png](https://upload-images.jianshu.io/upload_images/13129256-5f29d7eb7f434c2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 我这里是调用的服务端，它去拿 token 请求微信接口，我把需要的参数传入，它把图片的 base64 把前缀去掉的格式给我

#### 拿到图片后
- 先把创建临时文件地址
```js
  let filePath = `${Taro.env.USER_DATA_PATH}/image.png`
```
- 把base64 转成 ArrayBuffer
- 然后写入到上面的临时文件地址去
```js
Taro.getFileSystemManager().writeFile({
   filePath: filePath,
   data: Taro.base64ToArrayBuffer(data.data),
   encoding: 'binary',
   success: (res) => {
      SetCodeImg(filePath)// 这里我用的 hook ，其实就是 SetState
   },
   fail: err => {
       console.log('err------>', err)
     },
 })
```
- 然后拿这个地址写到 canvas 里面的  drawImage 里面

## 但是，说一下我遇到的问题
```Android 手机上，如果连续生成几次不同的二维码，参数也不同，但得到的结果是第一次生成的参数， 只有真机上会出现，模拟器上是不会出现的```
- 真的是坑死我了，IOS 上没有这个问题，我试了好几种方式，例如：
  1. 升级taro版本 😭， 升级微信版本
  2. 每次生成完二维码后，都把二维码临时的文件删除掉
  ...
- 直接用 base64 的图片是可以的，但小程序不支持
#### 解决方式
- 把每次生成的临时文件的地址都不一样，因为我上面临时文件名是写死的，直接给它每次不同的文件名, 在文件名后面加上时间戳
```js
 let filePath = `${Taro.env.USER_DATA_PATH}/image-${new Date().getTime()}.png`
```

## 获取二维码中的参数
- 查看我的另一个小文章
[获取二维码参数](https://www.jianshu.com/p/fb9862d16468)
