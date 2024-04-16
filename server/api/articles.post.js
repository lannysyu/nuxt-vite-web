// 建立文章 API
// 文章資料最終保存於 db 內，因此 import 與 db 連線的資料庫 pool
import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {

    // 驗證權限，檢查是否有 context，且 id 不為 1
    if (event.context?.auth?.user?.id !== 1) {
        throw createError({
            statusCode: 401,
            message: '沒有權限'
        })
    }

    // 用 readBody 解析 body
    const body = await readBody(event)

        // 使用 pool 的 query 函式進行資料庫的查詢，使用 insert 將文章資料插入 article 資料表內
        const articleRecord = await pool
            .query('INSERT INTO "article" ("title", "content", "cover") VALUES ($1, $2, $3) RETURNING *;', [
            body.title,
            body.content,
            body.cover
            ])

            // 如果成功，會取得插入文章的紀錄
            .then((result) => {
            if (result.rowCount === 1) {
                return result.rows?.[0]
            }
            })
            .catch((error) => {
            console.error(error)
            throw createError({
                statusCode: 500,
                message: '無法建立文章，請稍候再試'
            })
            })

        if (!articleRecord) {
            // 如果失敗，會回傳錯誤訊息
            throw createError({
            statusCode: 400,
            message: '建立文章失敗，請稍候再試'
            })
        }

    return articleRecord
})
