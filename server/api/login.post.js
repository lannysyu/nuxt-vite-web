// 建立登入 API 與產生 JWT Token
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    // 使用 readBody 函式取得請求中的 body 資料，預期夾帶 account 和 password
    const body = await readBody(event)

    if (!(body.account === 'ryan' && body.password === 'iThome2023')) {
        throw createError({
        statusCode: 400,
        statusMessage: '登入失敗'
        })
    }

    // 登入成功後建構使用者資訊，並作為 jwtToken 的 payload
    const jwtTokenPayload = {
        id: 1,
        nickname: 'Ryan',
        email: 'ryanchien8125@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?fit=crop&w=128&h=128'
    }

    // jwtToken 時效
    const maxAge = 60 * 60 * 24 * 7
    // jwtToken 保存在 cookie 的時間
    const expires = Math.floor(Date.now() / 1000) + maxAge

    // 使用 jwtToken 提供的 sign 函式簽發 token 並製作密鑰字串
    const jwtToken = jwt.sign(
        {
        exp: expires,
        data: jwtTokenPayload
        },
        'JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY'
    )

    // 用 setCookie 將 jwtToken 儲存在 cookie 的 access_token (key值) 當中
    setCookie(event, 'access_token', jwtToken, {
        maxAge,
        expires: new Date(expires * 1000),
        secure: true,
        httpOnly: true,
        path: '/'
    })

    // 最後回傳登入成功
    return '登入成功'
})
