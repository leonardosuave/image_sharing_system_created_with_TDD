const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const JWTSecret = 'suuwnjkasidiqpwsccxvwgtoodhwuyasdny'

exports.register = async (req, res) => {
    try {
        if(req.body.name == '', req.body.email == '', req.body.password == '') return res.sendStatus(400);

        const findEmail = await UserModel.findByEmail(req.body.email)
        if(findEmail != undefined) {
            res.statusCode = 400
            res.json({error: 'E-mail ja cadastrado'})
            return 
        } 

        const result = await UserModel.register(req.body)
        if(result != undefined) {
            //console.log(result)
            res.json({email: result.email})
        }

    }catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

exports.deleteUser = async (req, res) => {
    await UserModel.deleteByEmail(req.params.email)
    res.sendStatus(200) 
}

exports.auth = async (req, res) => {

    const {email, password} = req.body
    jwt.sign({email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            res.json({token: token})
        }
    })
}