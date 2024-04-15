// 建立取得指定文章 API
import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {

    // 使用 getRouterParam，取得 id 參數作為 articleId
    const articleId = getRouterParam(event, 'id')

    const articleRecord = await pool
        // 藉由 query 函式下 select 指令查詢資料表中的 id 欄位匹配到指定的文章編號 articleId
        .query('SELECT * FROM "article" WHERE "id" = $1;', [articleId])
        // 並回傳查詢結果陣列的第一筆元素
        .then((result) => result.rows?.[0])
        .catch((error) => {
        console.error(error)
            throw createError({
                statusCode: 500,
                message: '無法取得文章，請稍候再試'
            })
        })

    // 如果文章不存在，則回傳錯誤訊息
    if (!articleRecord) {
        throw createError({
        statusCode: 400,
        message: '取得文章失敗，請稍候再試'
        })
    }

    return articleRecord
})
