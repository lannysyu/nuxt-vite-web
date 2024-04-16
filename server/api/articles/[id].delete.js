// 建立刪除指定文章 API
import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {

    // 驗證權限，檢查是否有 context，且 id 不為 1
    if (event.context?.auth?.user?.id !== 1) {
        throw createError({
            statusCode: 401,
            message: '沒有權限'
        })
    }

    // 使用 getRouterParam 取得 id 參數做為文章 id
    const articleId = getRouterParam(event, 'id')

    const result = await pool
    // 使用 delete 指令刪除資料表內，符合文章 id 的紀錄
        .query('DELETE FROM "article" WHERE "id" = $1;', [articleId])
        .catch((error) => {
        console.error(error)
        throw createError({
            statusCode: 500,
            message: '無法刪除文章，請稍候再試'
        })
        })

    // 回傳結果會包含一個 rowCount 的數字，表示資料表受影響的資料列數若不等於 1，則無資料被刪除
    if (result.rowCount !== 1) {
        throw createError({
        statusCode: 400,
        message: '刪除文章失敗，請稍候再試'
        })
    }

    return {
        message: '刪除文章成功'
    }
})
