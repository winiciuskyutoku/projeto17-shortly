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