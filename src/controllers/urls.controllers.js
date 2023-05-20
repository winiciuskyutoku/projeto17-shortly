import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function shortenUrl(req, res){
    const {url} = req.body
    const token = res.locals.session
    const shortenUrl = nanoid(6)

    try{
        const user = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        console.log(user.rows, token)

        await db.query(`INSERT INTO urls ("userID", "shortUrl", url) VALUES ($1, $2, $3);`, [user.rows[0].id, shortenUrl, url])

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