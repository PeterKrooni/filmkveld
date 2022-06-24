const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.FILMKVELD_DB_URI)
        console.log(`Connected to MongoDB: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Failed to connect to MongoDB: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB