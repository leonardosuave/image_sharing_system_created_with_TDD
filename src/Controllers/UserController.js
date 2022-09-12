const UserModel = require('../Models/UserModel')

exports.register = async (req, res) => {
    try {

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