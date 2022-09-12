const express = require('express')
const app = express()

app.use(express.urlencoded({extends: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({})
})

module.exports = app