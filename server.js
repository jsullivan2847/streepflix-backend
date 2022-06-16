// Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const usersData = require('./user-data.json')

const app = express()

// app config 
const { PORT, DATABASE_URL} = process.env

// Middleware
app.use(cors())
app.use(express.json())

// mongoose connections
mongoose.connect(DATABASE_URL)
mongoose.connection
.on('connected', () => console.log('MongoDB is connected'))
.on('error', (err) => console.log(`Error with MongoDB ${err.mesasge}`))

// setup user profile model
const userSchema = new mongoose.Schema({
    name: String,
    image: String
})

const User = mongoose.model('User', userSchema)


// Routes



// listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))