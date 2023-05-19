import { db } from "../database/database.connection.js"

export async function signUp(req, res){
    const {email, name, password} = req.body

    try {
        await db.query(`INSERT INTO users (email, name, password) VALUES ($1, $2, $3);`, [email, name, password])

        res.sendStatus(201)
    } catch (err){
        res.status(500).send(err.message)
    }
}