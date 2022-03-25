import {
  reqCartList,
  reqDeleteCartById,
  reqUpdateCheckedById
} from '@/api/index.js'
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit("GETCARTLIST", result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车产品状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车全部商品
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      item.isChecked == 1 ? dispatch("deleteCartListBySkuId") : ''
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  // 修改全选按钮状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    // 数组
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    // 最终返回结果
    return Promise.all(promiseAll)
  } 
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}