const express =         require('express')
const cors =            require('cors')
const colors =          require('colors')
const connectDB =       require('./config/db')
const {errorHandler} =  require('./middleware/errorMiddleware')

// crud api
const users =           require('./api/crud/user/users.route')
const movie =           require('./api/crud/movie/movie.route')
const suggestion =      require('./api/crud/suggestion/suggestion.route')
const vote =            require('./api/crud/vote/vote.route')
const authentication =  require('./api/crud/authentication/auth.route')
const tag =             require('./api/crud/tag/tag.route')

// rest api
const omdbIntegration = require('./api/rest/integration/rest.omdb.route')
const suggestions =     require('./api/rest/suggestions/rest.suggestion.route')

const app = express();

require('dotenv').config({path: `./.env.${process.env.NODE_ENV}`})
const port = process.env.PORT || 8000

connectDB()

app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false, limit: '5mb' }))
app.use(errorHandler)

const crudPath = "/crud/api/"
app.use(crudPath + "user/", users);
app.use(crudPath + "movie/", movie);
app.use(crudPath + "suggestion/", suggestion)
app.use(crudPath + "vote/", vote)
app.use(crudPath + "auth/", authentication)
app.use(crudPath + "tag/", tag)

const restPath = "/rest/api/"
app.use(restPath + "integration/", omdbIntegration)
app.use(restPath + "suggestions/", suggestions)

app.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports.app;
