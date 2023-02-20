require('dotenv').config()
const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {sequelize} = require('database.js') //fix import

const app = express()

app.use(express.json())
app.use(cors())

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log( `Server up on ${SERVER_PORT}`))
})