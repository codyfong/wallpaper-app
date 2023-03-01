const {Favorite}  = require('../models/favorites')
const {User} = require('../models/user')

module.exports = {
    getFavorites: async (req, res) => {
        try {
            const {userId} = req.body
            const favorites = await Favorite.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            console.log('in get favorites')
            console.log(favorites)
            res.status(200).send(favorites)
        } catch (error) {
            console.log('ERROR IN getFavorites')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addFavorite: async (req, res) => {
        try {
            const {userId, image_properties} = req.body
            await Favorite.create({image_properties, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteFavorite: async (req,res) => {
        try {
            const {id} = req.params
            await Favorite.destroy({where: {id: +id}})
            console.log('delte favorite')
            res.sendStatus(200)

        } catch (error) {
            console.log('ERROR IN deleteFavorite')
            console.log(error)
            res.sendStatus(400)
        }
    }
}