require('dotenv').config()
const https = require('https');

const express = require('express')
const cors = require('cors')
const app = express()


const {sequelize} = require('./util/database')
const {PORT} = process.env

const {User} = require('./models/user')
const { Favorite } = require('./models/favorites')

const {isAuthenticated} = require('./middleware/isAuthenticated')

const {getPhotos, getFeatured} = require('./controllers/images')
const {register, login} = require('./controllers/auth')
const { addFavorite, getFavorites, deleteFavorite } = require('./controllers/favorites')


app.use(express.json())
app.use(cors())

User.hasMany(Favorite)
Favorite.belongsTo(User)


//AUTH
app.post('/register', register)
app.post('/login', login)


//GET PHOTOS
app.post('/photos', isAuthenticated,  getPhotos)
app.post('/featured', getFeatured)

//FAVORITES
app.post('/addfavorite', isAuthenticated, addFavorite)
app.post('/favorites', isAuthenticated, getFavorites)
app.delete('/favorites/:id', deleteFavorite)

const getUsername = async (req, res) => {
    try{
        const {userId} = req.params
        const user = await User.findAll({
            where: {id: userId},
            
        })
        res.status(200).send(user)
    }
    catch(error){
        console.log('error in username', error)
        res.sendStatus(400)
    }
}

//GET USERNAME
app.get('/getusername/:userId', getUsername)


// app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
const https_options = {
    ca: fs.readFileSync("../../ca_bundle.crt"),
    key: fs.readFileSync("../../private.key"),
    cert: fs.readFileSync("../../certificate.crt")
   };

sequelize.sync()
// sequelize.sync({ force: true })
// the force: true is for development -- it DROPS tables!!!
.then(() => {
    https.createServer(https_options, app).listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))