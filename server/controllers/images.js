const pexelsURL = require("../pexelsURL")
const { API_KEY } = process.env
const {createClient} = require('pexels')
module.exports = {
    getPhotos: async (req, res) => {
        
        console.log(req.body.query)

        const client = createClient(API_KEY);
        const query = req.body.query;

        client.photos.search({ query, per_page: 150 })
        .then(photos => {
            res.send(photos)
        });

    }, 

    getFeatured: async (req, res) => {
        
        console.log(req.body.query)

        const client = createClient(API_KEY);

        client.photos.curated({ query, per_page: 150 })
        .then(photos => {
            res.send(photos)
        });

    }, 
}