import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 引入home search Detail
import home from './Home/index.js'
import search from './Search/index.js'
import Detail from './Detail/index.js'
import ShopCar from './ShopCart/index.js'
import User from './User/index.js'
import Trade from './Trade/index.js'
export default new Vuex.Store({
  modules: {
    home,
    search,
    Detail,
    ShopCar,
    User,
    Trade
  }
})
