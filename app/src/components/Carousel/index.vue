<template>
  <div class="floorBanner">
    <div class="swiper-container" ref="floor1Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:["list"],
    watch: {
    list: {
      // 进来就立即监听一次
      immediate: true,
      handler(newValue) {
        // 使用$nextTick
        this.$nextTick(() => {
          const swiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true,
            // 分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击小圆点切换图片
              clickable: true,
            },
            // 前进后退
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
    },
  },
}
</script>

<style></style>
