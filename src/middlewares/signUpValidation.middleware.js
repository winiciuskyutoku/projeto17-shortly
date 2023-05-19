import { db } from "../database/database.connection.js"

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