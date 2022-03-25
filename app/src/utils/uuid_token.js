import { v4 as uuidv4 } from 'uuid';
// 生成一个随机字符串
export const userTemp = () => {
  // 先从本地存储获取uuid
  let userInfo = localStorage.getItem("UUIDTOKEN")
  // 如果本地存储没有 就生成一个
  // if只会执行一次
  if (!userInfo) {
    // 生成
    userInfo = uuidv4()
    // 本地存储一次
    localStorage.setItem("UUIDTOKEN", userInfo)
  }
  return userInfo
}