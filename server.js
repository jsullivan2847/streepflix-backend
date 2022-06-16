// Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

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

// Routes 
// Index 
app.get('/', (req, res) => {
    res.send('hello there')
})


// listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))