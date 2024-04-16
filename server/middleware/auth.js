import jwt from 'jsonwebtoken'

// 建立需要驗證的 api 規則
const urls = [
    {
        path: '/api/articles',  // 路徑條件一
        method: 'POST'
    },
    {
        path: /^\/api\/articles\/(.*)($|\?.*|#.*)/,  // 路徑條件二
        method: 'DELETE'
    },
    {
        path: /^\/api\/articles\/(.*)($|\?.*|#.*)/,  // 路徑條件二
        method: 'PATCH'
    }
]

export default defineEventHandler((event) => {
    // 驗證判斷
    const requireVerify = urls.some((apiUrl) => {
        // 請求方法是否包含在規則內
        if (event.method === apiUrl.method) {
            
            // 路徑是否為正規表示法且在規則內 (條件二)
            if (apiUrl.path instanceof RegExp) {
                return apiUrl.path.test(event.path)
            }
            // 路徑是否包含在規則內 (條件一)
            return event.path === apiUrl.path
        }
        return false
    })

    if (!requireVerify) {
        return
    }
    // 使用 getCookie 取得 access_token 的資料
    const jwtToken = getCookie(event, 'access_token')

    if (jwtToken) {
        try {
            // 使用 verify 審查 jwtToken 是否過期或 payload 是否經過竄改，並從 data 解構出 payload 且重新命名為 user
            const { data: user } = jwt.verify(jwtToken, 'JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY')
            // 將 user 資料新增至 context 裡的 auth 物件 
            event.context.auth = {
                user
            }
        } catch (error) {
            console.error(error)
        }
    }
})
