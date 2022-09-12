const express = require('express');
const app = express();
const mongoose = require('mongoose');
const homeRoute = require('./Routes/homeRoute')
const userRoute = require('./Routes/userRoute')


app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Conexão com banco de dados
mongoose.connect('mongodb://localhost:27017/sharepics', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //console.log('conectando com o banco)
    }).catch(err => {
        console.log(err)
    })

app.use(homeRoute)
app.use(userRoute)

module.exports = app