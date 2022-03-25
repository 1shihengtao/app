<template>
  <div>
    <Header/>
    <!-- 路由展示 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
  
</template>

<script>
// 使用组件
// 引入Header
import Header from './components/Header/index.vue'
// 引入Footer
import Footer from './components/Footer/index.vue'
export default {
  components: {
    Header,
    Footer
  },
  // 请求放在App里只会执行一次 性能好
  mounted() {
    // Vuex发请求 获取数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>