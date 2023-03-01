require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {PORT} = process.env
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

//AUTH
// app.post('/register', register)
// app.post('/login', login)


app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))