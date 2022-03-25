import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入store
import store from './store'
// 引入mock
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 三级联动组件 全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel/index.vue'
import Pagination from '@/components/Pagination/index.vue'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 饿了么Ui注册
import { Button, MessageBox } from 'element-ui'
// 第一种注册方法
Vue.component(Button.name, Button)
// 第二种注册方法
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 把api引入
import * as API from '@/api'
// 引入图片懒加载 + 注册插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/images/奥特曼.gif'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm
})
// 引入表单验证插件
import '@/ValiDate/index.js'
new Vue({
  // 挂载路由与vuex
  router,
  store,
  // 全局总线
  beforeCreate() {
    Vue.prototype.$bus = this
    // 把APi挂载到原型上
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
