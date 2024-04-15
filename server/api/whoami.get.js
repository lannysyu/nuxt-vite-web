// 建立查詢使用者資訊的 API (驗證使用者的身分)
import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {

    // 從 getCookie 中取得 access_token 中夾帶的資料
    const jwtToken = getCookie(event,'access_token')

    try {
        // 利用 jwt 中提供的 verify 函式，驗證所夾帶的 token (jwtToken)，並使用密鑰字串解密與核實
        const { data: userInfo } = jwt.verify(jwtToken, 'JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY')

        // 如果 jwt 未過期也沒被竄改，就用 payload 解讀出使用者資訊並回傳
        return {
            id: userInfo.id,
            nickname: userInfo.nickname,
            email: userInfo.email,
            avatar: userInfo.avatar
        }
    } catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'unauthorized'
        })
    }
})
