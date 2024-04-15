// 建立登出註銷 Session 的 API
export default defineEventHandler((event) => {

    // 簡單作法 : 利用 setCookie 將 access_token 設置為 null (清除之意)
    setCookie(event, 'access_token',null)
  
    return 'ok'
  })
