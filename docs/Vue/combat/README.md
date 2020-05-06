# vue-awesome-swiper 自定义分页器
- 今天写自定义分页 踩了一些坑，记录一下
- 首选使用的是 Directive 指令的方式，nuxtjs (Vue 项目也是相同)
#### 自定义分页器
```html
  <div class="slide-wrapper">
    <div class="slide_web" v-swiper:swiper="swiperOption2">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, k) in userSlideList" :key="k">
          <img :src="slide.img"/>
        </div>
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination" id="custom">
    </div>
  </div>
```
```js
data() {
  return {
    const vm = this
    swiperOption2: {
      effect: 'coverflow',
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loopedSlides: 1,
      slidesPerView: 1,
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        depth: 20,
        slideShadows : false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        clickable: true, // 自定义分页加了这个 没效果
        renderCustom: function (swiper, current, total) { // 这里因为 this 作用域的关系，不能直接使用 this 获取 Vue 相关内容，通过上面的 const vm = this，使用 vm 获取
          const _html = '';
          for (let i = 1; i <= total; i++) {
            if (current == i) {
              _html += `<div class="swiper-pagination-custom-item">
                <div class="image-wrap active" index="${i}">
                  <img class="custom-img" index="${i}" src="${vm.thumbsList[i - 1].img}" alt="">
                </div>
                <span>${vm.thumbsList[i - 1].text}</span>
              </div>`
            } else {
              _html += `<div class="swiper-pagination-custom-item">
                <div class="image-wrap" index="${i}">
                  <img class="custom-img" index="${i}" src="${vm.thumbsList[i - 1].img}" alt="">
                </div>
                <span>${vm.thumbsList[i - 1].text}</span>
              </div>`
            }
          }
          return _html
        }
      }
    },
  }
}
```
- 但是点击事件没有生效，点击分页器需要 轮播图 随着改变
#### 自定义点击事件
- 要在自定义分页器上在加上点击事件， 说一下我的思路，因为 上面的 renderCustom 每次都会重新赋值，直接使用 onclick 方式不行，也不能传参，所以我就借用了 <font color=red>冒泡</font> 的机制。通过获取标签上的自定义属性，获取当前需要点击跳转的 index
```js
mounted() {
  this.customBox = document.getElementById('custom')
  this.customBox.addEventListener('click', this.handleClick, false)
},

methods: {
  handleClick(e) {
    // 获取目标元素，拿到目标元素上的 index 值
    const current = e.target
    const toCount = current.attributes["index"].value || ''
    // 跳转到指定的 swiper 页面
    if (toCount) {
      this.swiper.slideTo(toCount)
    }
  }
},

destroyed() {
  this.customBox.removeEventListener('click', this.handleClick, false)
}
```

#### 多个 swiper 联动效果 
- 使用场景，例如缩略图要和轮播图联动，但是如果只是这样，可以使用我上面说的自定义 分页器，我这里联动是因为还要和另一个 轮播图联动，一共三个联动😭
- 例如：
```html
<div class="swiper-container">
  <div class="slide_web slide-title-wrap" v-swiper:swiper="swiperOption1">
    <div class="swiper-wrapper">
      <div class="swiper-slide swiper-no-swiping" v-for="(slide, k) in textList" :key="k">
        <div class="title">{{slide.title}}</div>
        <span class="subtitle">{{slide.subtitle}}</span>
      </div>
    </div>
  </div>
  <div class="slide-wrapper">
    <div class="slide_web" v-swiper:swiperTop="swiperOption2">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, k) in userSlideList" :key="k">
          <img :src="slide.img"/>
        </div>
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination" id="custom">
    </div>
  </div>
</div>
```
- 联动 
```js
  mounted() {
    this.$nextTick(() => {
      const swiper1 = this.swiper
      const swiper2 = this.swiperTop
      swiper2.controller.control = swiper1
      swiper1.controller.control = swiper2
    })
  }
```
