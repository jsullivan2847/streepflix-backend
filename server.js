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

// test route
app.get('/', async (req, res) => {
    try {
        res.send(usersData)
    } catch (err) {
        console.log('error', err)
        res.send('something went wrong- check logs')
    }
})

// Index Route
app.get('/user', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (err) {
        console.log('error', err)
        res.send({error: 'Something went wrong - check logs'})
    }
})


// Create route
app.post('/user', async (req, res) => {
    try {
        const singleUser = await User.create(req.body)
        res.send(singleUser)
    } catch (err) {
        console.log('error', error) 
        res.send({error: 'Something went wrong - check logs'})
    }
})



// listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))