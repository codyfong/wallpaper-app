const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Favorite : sequelize.define('favorites', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        image_properties: DataTypes.JSONB,

    })
}