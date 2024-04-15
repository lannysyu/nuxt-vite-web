// 建立取得文章列表 API
import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {
    const query = await getQuery(event)

    // 第幾頁，設定包含數字 1 以上的整數
    const page = Math.max(parseInt(query.page) || 1, 1)
    // 每頁的文章數量，設定最小為 1，最大為 100，沒有設定則預設為 10
    const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100)

    const articleRecords = await pool
        // 以 query 函式查詢指令 select ，並帶入頁碼及數量的條件
        .query('SELECT * FROM "article" ORDER BY "updated_at" DESC OFFSET $1 LIMIT $2;', [
        (page - 1) * pageSize,
        pageSize
        ])
        // 最終獲取的結果
        .then((result) => result.rows)
        .catch((error) => {
        console.error(error)
        throw createError({
            statusCode: 500,
            message: '無法取得文章列表，請稍候再試'
        })
        })

    return {
        items: articleRecords,
        page,
        pageSize
    }
})
