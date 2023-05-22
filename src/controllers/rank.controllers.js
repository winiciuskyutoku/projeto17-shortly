import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
    try {
        const usersRanking = await db.query(`
        SELECT 
        users.id,
        users.name,
        COUNT(urls."userId") AS "linksCount",
        SUM(urls."visitCount") AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `)

        res.status(200).send(usersRanking.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}