# taro canvas 生成海报
## 前言
- 📝 一下这几天写小程序，使用 canvas 动态生成海报，下载分享的效果
- 使用 taro 做小程序，因为可以用 React，使用了最新的 React hooks 的方式（好像也不新了）
- <font color="red"> 刚开始写感觉很累，因为没有搞过小程序，并且也不会用 canvas，我只能写一点，编译一下看效果👀，走了很多弯路，花了很多心思，结果出来后，感觉自己太笨了（学习能力还有待提高）</font>
![成品效果.png](https://upload-images.jianshu.io/upload_images/13129256-29c46b33439e5025.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 按钮样式还没有改，等成品出来改一下 （打个小广告）

## 下载网络图片，处理多张图片
- 因为要动态画头像，需要把网络图片地址，下载后画到 canvas 中
#### 封装一个处理多张图片的 promise
- <font color="red">因为不想使用 getImageInfo 一层层嵌套，图片很多的话，岂不是乱的像🐶一样。</font>
```js
// 处理多张网络图片
  const processMultipleImages = (url) => {
    return new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: url,
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          Taro.showToast({
            title: '下载失败!'
          })
        }
      })
    })
  }
```
#### 处理所有图片
- 使用 promise.all 转换所有的图片地址
```js
  // 获取基本信息
  useEffect(() => {
    // 获取所有的网络图片
    Promise.all(
      imageAry.map(img => processMultipleImages(img))
    ).then(images => {
      const imgAll = images.map(i => i.path)
      SetUrl(imgAll)
    })
  }, [])
```
## 画主体
#### 获取屏幕信息
- <font color="red"> 主要是获取宽度和高度，动态给 canvas 设置宽高，已经 canvas 间距，rate 表示转换的倍数（根据设计稿的标准宽高），目前是用的这种方式，</font>网上看了很多都没有转换，难道不用根据设备适配吗？还是说我用的方式不对，业务催得紧没有仔细研究，如果你知道的话，欢迎交流~
```js
  const d = Taro.getSystemInfoSync()
  const w = d.windowWidth * 0.85
  const h = (w / 0.75).toFixed(2)
  const rate = (d.windowWidth / 375).toFixed(2)
  SetWidth(w)
  SetHeight(h)
  SetRate(rate)
```
- 宽度和高度
```js
  return (
    <View className="share-user-container">
      <Canvas style={{width: `${width}px`, height: `${height}px`}} canvasId="shareuser" id="shareuser" className="canvas-wrapper"></Canvas>
      <Button onClick={onClickSaveImage}>保存到相册</Button>
    </View>
  )
```
#### 圆形头像
```js
  const ctx = Taro.createCanvasContext('shareuser');
  // 画内圆 并 填充头像
  ctx.beginPath()
  const x = 56 * rate
  const y = 74 * rate + 64 * rate
  ctx.arc(x, y, 64 * rate, 0, 2 * Math.PI)
  ctx.clip()
  ctx.drawImage(imageUrl[0], 0 * rate, 74 * rate, 128 * rate, 128 * rate)
  ctx.closePath()
  ctx.restore()
  // 绘制文本
  drawText(ctx, '#1D1E1F', '来自xxx 的脱单团', 66 * rate, 24 * rate, 12)
  ctx.save()
```
- drawText 绘制文字方法
```js
  // 绘制文本
  const drawText = (ctx, color, text, x, y, font = 16) => {
    ctx.setFontSize(font)
    ctx.setFillStyle(color)
    ctx.setTextAlign('left')
    ctx.fillText(text, x, y)
    ctx.stroke()
    ctx.closePath()
  }
```
#### 画圆
```js
  // 画外圆
  ctx.beginPath()
  ctx.arc(56 * rate, 140 * rate, 80 * rate, 0, 2*Math.PI)
  ctx.lineWidth = 16 * rate
  ctx.clip()
  ctx.strokeStyle = "#FFE04A";
  ctx.stroke()
  ctx.closePath()
```
#### 二维码
- 这里的二维码目前是写死的，但业务需要动态生成，等我做了加上待更新...
```js
  const size14 = 14 * rate
  // 绘制二维码
  ctx.drawImage(imageUrl[1], 210 * rate, 120 * rate, 86 * rate, 86 * rate)
  drawText(ctx, '#1D1E1F', '扫码认识Ta', 216 * rate, 220 * rate, size14)
```
#### 最后生成图片
- <font color="red"> 这里微信的官方说，放到 ctx.draw() 的 callback 里面，但是没有执行，不知道为啥，这里就先使用了 setTimeout 模拟异步生成 </font>
```js
  setTimeout(() => {
    Taro.canvasToTempFilePath({
      x:0,
      y:0,
      width,
      height,
      canvasId: 'shareuser',
      success: (result) => {
        SetImage(result.tempFilePath)
      },
      fail: (err) => {
        Taro.showToast('图片生成失败！')
      }
    })
  }, 600)
```
#### 保存到相册中，需要用户授权
- 调用授权，需要兼容如果用户点击取消的操作
```js
// 保存到相册
  const onClickSaveImage = () => {
    Taro.getSetting({
      success(res) {
        // 如果没有授权过，则要获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 保存图片
              savePictureSystem()
            },
            fail() { // 用户拒绝
              Taro.showModal({
                title: '授权',
                content: '您拒绝了授权请求，是否要手动开启？',
                success: function (res) {
                  if (res.confirm) {
                    Taro.openSetting({
                      success: function (res) {
                        console.log(res.authSetting)
                        res.authSetting = {
                          "scope.userInfo": true,
                          "scope.userLocation": true
                        }
                      }
                    })
                  } else if (res.cancel) {
                    Taro.showToast({
                      title: '保存失败！',
                      icon: 'close',
                      duration: 2000
                    })
                  }
                }
              })
            }
          })
        } else { // 如果已经授权过，可以直接保存
          savePictureSystem()
        }
      }
    })
  }
```
```js
  // 把图片保存到系统中
  const savePictureSystem = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: saveImage,
      success(res) {
        Taro.showToast({
          title: '保存成功!'
        })
      },
      fail() {
        Taro.showToast({
          title: '保存失败!',
          icon: 'close',
          duration: 2000
        })
      }
    })
  }
```

## 所有代码
```js
  // 获取基本信息
  useEffect(() => {
    const d = Taro.getSystemInfoSync()
    const w = d.windowWidth * 0.85
    const h = (w / 0.75).toFixed(2)
    const rate = (d.windowWidth / 375).toFixed(2)
    SetWidth(w)
    SetHeight(h)
    SetRate(rate)

    // 获取所有的网络图片
    Promise.all(
      imageAry.map(img => processMultipleImages(img))
    ).then(images => {
      const imgAll = images.map(i => i.path)
      SetUrl(imgAll)
    })
  }, [])

  useEffect(() => {
    if (imageUrl.length > 0) {
      drawContent()
    }
  }, [imageUrl])

  // 画主体内容
  const drawContent = () => {
    const ctx = Taro.createCanvasContext('shareuser');
    const cx = 5 * rate + 20 * rate
    const cy = 12 * rate + 20 * rate
    // 背景颜色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, width, height)
    ctx.save()

    // 头像
    ctx.beginPath()
    ctx.arc(cx, cy, 20 * rate, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(imageUrl[0], 6 * rate, 12 * rate, 40 * rate, 40 * rate)
    ctx.restore()

    drawText(ctx, '#1D1E1F', '来自xxx 的脱单团', 66 * rate, 24 * rate, 12)
    ctx.save()
    // 画外圆
    ctx.beginPath()
    ctx.arc(56 * rate, 140 * rate, 80 * rate, 0, 2*Math.PI)
    ctx.lineWidth = 16 * rate
    ctx.clip()
    ctx.strokeStyle = "#FFE04A";
    ctx.stroke()
    ctx.closePath()
    // 画内圆 并 填充头像
    ctx.beginPath()
    const x = 56 * rate
    const y = 74 * rate + 64 * rate
    ctx.arc(x, y, 64 * rate, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(imageUrl[0], 0 * rate, 74 * rate, 128 * rate, 128 * rate)
    ctx.closePath()

    ctx.restore()

    // 绘制圆圈装饰
    ctx.beginPath()
    ctx.arc(250 * rate, 47 * rate, 18 * rate, 0, 2*Math.PI)
    ctx.lineWidth = 4 * rate
    ctx.strokeStyle = "#FFE04A";
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(200 * rate, 80 * rate, 9 * rate, 0, 2*Math.PI)
    ctx.lineWidth = 5 * rate
    ctx.strokeStyle = "#FFE04A";
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(280 * rate, 98 * rate, 14 * rate, 0, 2*Math.PI)
    ctx.lineWidth = 10 * rate
    ctx.strokeStyle = "#FFE04A";
    ctx.stroke()
    ctx.closePath()

    drawFillCircle(ctx, 238, 83, 9)
    drawFillCircle(ctx, 220, 106, 8)
    drawFillCircle(ctx, 200, 140, 8)

    ctx.restore()

    const size14 = 14 * rate
    // 绘制二维码
    ctx.drawImage(imageUrl[1], 210 * rate, 120 * rate, 86 * rate, 86 * rate)
    drawText(ctx, '#1D1E1F', '扫码认识Ta', 216 * rate, 220 * rate, size14)

    // 绘制个人基本信息
    ctx.beginPath()
    const margin56 = 56 * rate
    drawText(ctx, '#1D1E1F', '某个用户的昵称', size14, 270 * rate, 20 * rate)
    drawText(ctx, '#1D1E1F', '资料', size14, 300 * rate, size14)
    drawText(ctx, '#1D1E1F', '这是个人信息|什么|换行', margin56 * rate, 300 * rate, size14)
    drawText(ctx, '#1D1E1F', '兴趣', size14, 336 * rate, size14)
    drawText(ctx, '#1D1E1F', '唱歌、篮球、rap...', margin56 * rate, 336 * rate, size14)
    drawText(ctx, '#1D1E1F', '简介', size14, 372 * rate, size14)
    drawText(ctx, '#1D1E1F', '这是一段很长的简介...', margin56 * rate, 372 * rate, size14)


    ctx.draw()
    setTimeout(() => {
      Taro.canvasToTempFilePath({
        x:0,
        y:0,
        width,
        height,
        canvasId: 'shareuser',
        success: (result) => {
          SetImage(result.tempFilePath)
        },
        fail: (err) => {
          Taro.showToast('图片生成失败！')
        }
      })
    }, 600)
  }

  // 处理多张网络图片
  const processMultipleImages = (url) => {
    return new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: url,
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          Taro.showToast({
            title: '生成失败!'
          })
        }
      })
    })
  }

  // 绘制实心圆
  const drawFillCircle = (ctx, x, y, r, w) => {
    ctx.beginPath()
    ctx.arc(x * rate, y * rate, r * rate, 0, 2*Math.PI)
    ctx.fillStyle = "#FFE04A";
    ctx.fill()
    ctx.closePath()
  }

  // 绘制文本
  const drawText = (ctx, color, text, x, y, font = 16) => {
    ctx.setFontSize(font)
    ctx.setFillStyle(color)
    ctx.setTextAlign('left')
    ctx.fillText(text, x, y)
    ctx.stroke()
    ctx.closePath()
  }

  // 保存到相册
  const onClickSaveImage = () => {
    Taro.getSetting({
      success(res) {
        // 如果没有授权过，则要获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              savePictureSystem()
            },
            fail() { // 用户拒绝
              Taro.showModal({
                title: '授权',
                content: '您拒绝了授权请求，是否要手动开启？',
                success: function (res) {
                  if (res.confirm) {
                    Taro.openSetting({
                      success: function (res) {
                        console.log(res.authSetting)
                        res.authSetting = {
                          "scope.userInfo": true,
                          "scope.userLocation": true
                        }
                      }
                    })
                  } else if (res.cancel) {
                    Taro.showToast({
                      title: '保存失败！',
                      icon: 'close',
                      duration: 2000
                    })
                  }
                }
              })
            }
          })
        } else { // 如果已经授权过，可以直接保存
          savePictureSystem()
        }
      }
    })
  }

  // 把图片保存到系统中
  const savePictureSystem = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: saveImage,
      success(res) {
        Taro.showToast({
          title: '保存成功!'
        })
      },
      fail() {
        Taro.showToast({
          title: '保存失败!',
          icon: 'close',
          duration: 2000
        })
      }
    })
  }

  return (
    <View className="share-user-container">
      <Canvas style={{width: `${width}px`, height: `${height}px`}} canvasId="shareuser" id="shareuser" className="canvas-wrapper"></Canvas>
      <Button onClick={onClickSaveImage}>保存到相册</Button>

    </View>
  )
}
```