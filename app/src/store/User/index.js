import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
}
from '@/api/index.js'
// 登录与注册模块
const state = {
  code: '',
  // 获取存储的token
  token: localStorage.getItem('TOKEN'),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地的token
  CLEAR(state) {
    state.token = ""
    state.userInfo = {}
    localStorage.removeItem("TOKEN")
  }
}
const actions = {
  // 获取验证码
  async getCode({
    commit
  }, Phone) {
    let result = await reqGetCode(Phone)
    if (result.code == 200) {
      commit("GETCODE", result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({
    commit
  }, user) {
    let result = await reqUserRegister(user)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录
  async userLogin({
    commit
  }, data) {
    let result = await reqUserLogin(data)
    // 服务器下发token 用户的唯一标识
    // 利用token获取用户相关信息
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token)
      // 因为vuex存储的数据不是永久的，所以要用到本地存储来存储token
      localStorage.setItem("TOKEN", result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({
    commit
  }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit("GETUSERINFO", result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({
    commit
  }) {
    let result = await reqLogout()
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}