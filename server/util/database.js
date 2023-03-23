// require('dotenv').config({path: "../.env"})
// const path = require('node:path')
// require("dotenv").config({
//     path: path.resolve(__dirname, '../.env')
//   });
// const {CONNECTION_STRING} = process.env

const {CONNECTION_STRING} = require('../config')
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    sequelize
}