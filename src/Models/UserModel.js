const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('users', UserSchema);

class User {

    async register(body) {
        const newUser = new UserModel({name: body.name, email: body.email, password: body.password})
        return await newUser.save()
    }
}

module.exports = new User()


