import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"

export async function signUpValidation(req, res, next){
    const {name, password, confirmPassword} = req.body

    try {
        if(password !== confirmPassword) return res.status(401).send({message: "As senhas nao estao iguais."})

        const checkUser = await db.query(`SELECT * FROM users WHERE name = $1;`, [name])
        if(checkUser.rowCount !== 0) return res.status(409).send({message: "Esse usuario ja existe."})

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function singInValidation(req, res, next){
    const {email, password} = req.body

    try {
        const checkUser =  await db.query(`SELECT * FROM users WHERE email = $1;`, [email])

        if(checkUser.rowCount === 0) return res.status(404).send({message: "Esse usuario nao existe"})

        const isMatch = bcrypt.compareSync(password, checkUser.rows[0].password)

        if(!isMatch) return res.status(401).send({message: "Senha invalida."})

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}