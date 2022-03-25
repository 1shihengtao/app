import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api/index.js"
// 把封装的游客身份模块引入
import {
  userTemp
} from '@/utils/uuid_token.js'
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: userTemp()
}
const mutations = {
  GETGOODSINFO(state,goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit("GETGOODSINFO", result.data)
    }
  },
  // 将产品添加到购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 代表加入购物车成功
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error(faile))
    }
  }
}
// 简化数据
const getters = {
  // 路径导航简化
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性简化
  spuSaleAttrList(state) {  
    return state.goodInfo.spuSaleAttrList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}