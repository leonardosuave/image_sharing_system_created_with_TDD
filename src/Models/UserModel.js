const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('users', UserSchema);

class User {

    async register(body) {

        if(!validator.isEmail(body.email)) return //Rever após aula e hash

        //Hash de password
        const password = body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = new UserModel({name: body.name, email: body.email, password: hash})
        return await newUser.save()
    }

    async findByEmail(email) {
        return await UserModel.findOne({email: email})
    }

    async deleteByEmail(email) {
        await UserModel.deleteOne({'email': email})
    }
}

module.exports = new User()


