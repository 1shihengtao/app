// 对api进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'
// 三级联动
export const reqCategoryList = () => requests({
  url: '/product/getBaseCategoryList',
  method: 'get'
})

// 获取banner接口
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get("/floor")


// 获取搜索页面的数据  post请求
// 当前接口 给服务器传的params 至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
  url: "/list",
  method: "post",
  data: params
})


// 获取产品详情
export const reqGoodsInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get'
});

// 将产品添加到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
});


// 获取购物车列表数据
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

// 删除购物车产品
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

// 修改产品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 注册
export const reqUserRegister = (data) => requests({
  url: `/user/passport/register`,
  method: 'post',
  data
});

// 登录
export const reqUserLogin = (data) => requests({
  url: `/user/passport/login`,
  data,
  method: 'post'
})

// 获取用户信息 带着用户token获取
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

// 退出登录
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})

// 获取用户地址信息
export const reqAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

// 获取商品清单
export const reqOrderInfo = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

// 提交订单 (从这里开始，服务器返回的数据不写在Vuex)
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

// 获取支付信息
export const reqPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

// 获取支付状态
export const reqPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
});

// 获取个人中心数据
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})