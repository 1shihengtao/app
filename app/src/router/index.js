import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 创建实例
// 导入路由组件
import Home from '@/views/Home/index.vue'
import Search from '@/views/Search/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Detail from '@/views/Detail/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
import ShopCart from '@/views/ShopCart/index.vue'
import Trade from '@/views/Trade/index.vue'
import Pay from '@/views/Pay/index.vue'
import PaySuccess from '@/views/PaySuccess/index.vue'
import Center from '@/views/Center/index.vue'
// 二级路由
import MyOrder from '@/views/Center/MyOrder/index.vue'
import GroupOrder from '@/views/Center/GroupOrder/index.vue'
// 引入仓库 用token
import store from '@/store'
// 备份push replace方法 (编程式导航跳转时连续点击会报错，所以需要重写push和replace方法)
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push
VueRouter.prototype.push = function (location, res, rej) {
  if (res && rej) {
    originPush.call(this, location, res, rej);
  } else {
    originPush.call(this, location, () => {}, () => {});
  }
}
// 重写replace
VueRouter.prototype.replace = function (location, res, rej) {
  if (res && rej) {
    originReplace.call(this, location, res, rej);
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}
// 实例化VueRouter
// 路由规则
const router = new VueRouter({
  routes: [
    // 路由规则
    {
      path: '/detail/:skuid',
      component: Detail,
      meta: {
        show: true
      }
    },
    {
      path: '/center',
      component: Center,
      meta: {
        show: true
      },
      // 二级路由
      children: [
        // 路由规则
        { path: 'myorder', component: MyOrder },
        { path: 'grouporder', component: GroupOrder },
        // 路由重定向
        {path: '/center', redirect: '/center/myorder'}
      ]
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: {
        show: true
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: {
        show: true
      },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/trade',
      component: Trade,
      meta: {
        show: true
      },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: {
        show: true
      }
    },
    {
      path: '/addCartSuccess',
      component: AddCartSuccess,
      name: "addCartSuccess",
      meta: {
        show: true
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: '/search:keyWord?',
      component: Search,
      meta: {
        show: true
      },
      name: 'search',
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        show: false
      }
    },
    // 路由重定向
    {
      path: '/',
      redirect: '/home'
    }
  ],
  // 路由的滚动行为，路由跳转时
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
})
// 全局守卫
router.beforeEach(async (to, from, next) => {
  next()
  // 拿到token
  let token = store.state.User.token
  // 拿到用户信息
  let name = store.state.User.userInfo.name
  // 用户登录了（有token）
  if (token) {
    // 想去login，直接拦截
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登陆了 但是去的不是login 【home， search....】
      // 如果有name 直接放行
      if (name) {
        next()
      } else {
        // 没有name 派发action让仓库存储信息
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo")
          // 就放行
          next()
        } catch (error) {
          // 走这里代表token失效了
          // 清除token
          await localStorage.removeItem("TOKEN")
          //await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录(不能去交易相关的页面 && 支付相关的 && 个人中心)
    let toPath = to.path
    if (toPath == '/trade' || toPath.indexOf('/pay')!= -1 || toPath.indexOf('/center')!=-1) {
      alert("请登录或注册")
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
// 导出路由
export default router