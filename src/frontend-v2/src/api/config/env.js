const dotenv = require('dotenv')
dotenv.config()

function rest_url(){
    return process.env.VUE_APP_SERVER + process.env.VUE_APP_REST
}

function crud_url(){
    return process.env.VUE_APP_SERVER + process.env.VUE_APP_CRUD
}

module.exports = {
    rest_url, 
    crud_url
}