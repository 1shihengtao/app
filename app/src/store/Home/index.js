import {reqCategoryList, reqGetBannerList, reqFloorList} from "@/api/index.js"

const state = {
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor数据
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  // 通知API接口函数调用 向服务器发请求 获取服务器数据
  async categoryList({commit}) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
        commit("GETBANNERLIST", result.data)
      }
  },
  // 获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data)
    }
  }
}
export default {
  state,
  mutations,
  actions,
}