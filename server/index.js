require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const {sequelize} = require('./util/database')
const {PORT} = process.env

const {User} = require('./models/user')
const { Favorite } = require('./models/favorites')

const {isAuthenticated} = require('./middleware/isAuthenticated')

const {getPhotos} = require('./controllers/images')
const {register, login} = require('./controllers/auth')
const { addFavorite, getFavorites, deleteFavorite } = require('./controllers/favorites')


app.use(express.json())
app.use(cors())

User.hasMany(Favorite)
Favorite.belongsTo(User)

//AUTH
app.post('/register', register)
app.post('/login', login)
// app.get('/username:id', getUsername)

//GET PHOTOS
app.post('/photos', isAuthenticated,  getPhotos)

//FAVORITES
app.post('/addfavorite', isAuthenticated, addFavorite)
app.post('/favorites', isAuthenticated, getFavorites)
app.delete('/favorites/:id', deleteFavorite)


// app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))

sequelize.sync()
// sequelize.sync({ force: true })
// the force: true is for development -- it DROPS tables!!!
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))