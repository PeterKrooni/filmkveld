const express = require('express')
const cors = require('cors')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const {errorHandler} = require('./middleware/errorMiddleware')
const users = require('./api/user/users.route')
const movie = require('./api/movie/movie.route')
const suggestion = require('./api/suggestion/suggestion.route')
const vote = require('./api/vote/vote.route')
const app = express();

dotenv.config()
const port = process.env.PORT || 8000

connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.use("/api/v1/user", users);
app.use("/api/v1/movie", movie);
app.use("/api/v1/suggestion", suggestion)
app.use("/api/v1/vote", vote)

app.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports.app;
