import { db } from "../database/database.connection.js"

export async function validateUrl(req, res, next){
    const {url} = req.body

    try {
        const checkUrl = await db.query(`SELECT * FROM urls WHERE url = $1;`, [url])
        if(checkUrl.rowCount !== 0) return res.status(409).send({message: "Esse url ja existe"})

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getValidateUrl(req, res, next){
    const {id} = req.params

    try {
        const checkUrl = await db.query(`SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE id = $1;`, [id])
        if(checkUrl.rowCount === 0 ) return res.status(404).send({message: "Esse url nao existe."})

        res.locals.url = checkUrl.rows[0]

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}
