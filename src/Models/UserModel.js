const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('users', UserSchema);

class User {

    async register(body) {

        if(!validator.isEmail(body.email)) return //Rever após aula e hash

        const newUser = new UserModel({name: body.name, email: body.email, password: body.password})
        return await newUser.save()
    }

    async findByEmail(email) {

        return UserModel.findOne({email: email})
    }
}

module.exports = new User()


