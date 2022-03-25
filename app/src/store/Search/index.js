import { reqGetSearchInfo } from '@/api'

// searchcangku
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取search模块的数据
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data)
    }
  }
}
// 计算属性
// 用于简化仓库中的数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  module
}