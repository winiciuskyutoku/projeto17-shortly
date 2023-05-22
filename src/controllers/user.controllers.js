import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp(req, res){
    const {email, name, password} = req.body

    try {
        const hash = bcrypt.hashSync(password, 10)

        await db.query(`INSERT INTO users (email, name, password) VALUES ($1, $2, $3);`, [email, name, hash])

        res.sendStatus(201)
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){
    try {
        const token = uuid()
        
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [res.locals.user, token])

        res.status(200).send({token})
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function getUsers(req ,res){
    const token = res.locals.session

    try {
        const userByToken = await db.query(`SELECT sessions."userId" FROM sessions WHERE token = $1;`, [token])
        const userById = userByToken.rows[0].userId
        
        const getUserData = await db.query(`
            SELECT users.id, users.name FROM users WHERE id = $1;
        `, [userById])

        console.log(getUserData.rows[0])

        const getUserUrls = await db.query(`
            SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE "userId" = $1;
        `, [userById])

        const shortenedUrls = getUserUrls.rows
        const sum = shortenedUrls.reduce((prevVal, currentVal) => {
            return prevVal + currentVal.visitCount
        }, 0)

        const userTable = {...getUserData.rows[0], visitCount: sum, shortenedUrls}

        res.status(200).send(userTable)
    } catch (err) {
        res.status(500).send(err.message)
    }
}