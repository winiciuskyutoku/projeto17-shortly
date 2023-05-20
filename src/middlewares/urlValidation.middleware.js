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

export async function validateShortUrl(req, res, next){
    const {shortUrl} = req.params
    
    try{
        const checkUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl])
        if(checkUrl.rowCount === 0) return res.status(404).send({message: "Esse url encurtado nao existe"})

        res.locals.shortUrl = checkUrl.rows[0]

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function validateDeleteUrl(req, res, next){
    const {id} = req.params
    const userToken = res.locals.session

    try{
        const getUser = await db.query(`SELECT sessions."userId" FROM sessions WHERE token = $1;`, [userToken])

        const checkUrl = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
        if(checkUrl.rowCount === 0) return res.status(404).send({message: "Esse url nao existe"})

        const checkUserUrl = await db.query(`SELECT * FROM urls WHERE id = $1 AND "userId" = $2;`, [id, getUser.rows[0].userId])
        if(checkUserUrl.rowCount === 0) return res.status(401).send({message: "Esse url pertence a esse usuario"})

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}
