import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function shortenUrl(req, res){
    const {url} = req.body
    const token = res.locals.session
    const shortenUrl = nanoid(6)

    try{
        const user = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        const getUserId = await db.query(`SELECT users.id FROM users WHERE id = $1;`, [user.rows[0].userId])

        await db.query(`INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3);`, [getUserId.rows[0].id, shortenUrl, url])

        const urlId = await db.query(`SELECT * FROM urls WHERE url = $1;`, [url])

        res.status(201).send({id: urlId.rows[0].id, url: urlId.rows[0].url})
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function getUrl(req ,res){
    try {
        res.status(200).send(res.locals.url)
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function getShortUrl(req, res){
    const {shortUrl} = req.params

    try {
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`, [shortUrl])

        res.redirect(res.locals.shortUrl.url)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteUrl(req, res){
    const {id} = req.params

    try {
        await db.query(`DELETE FROM urls WHERE id = $1;`, [id])

        res.status(204).send({message: "Url removido com sucesso"})
    } catch (err){
        res.status(500).send(err.message)
    }
}