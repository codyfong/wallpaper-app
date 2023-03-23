const path = require('node:path')
require("dotenv").config({
    path: path.resolve(__dirname, './.env')
  });
const {CONNECTION_STRING, PORT, SECRET, API_KEY} = process.env
module.exports = {
    PORT,
    SECRET,
    CONNECTION_STRING,
    API_KEY


}