require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')

const petRouter = require('./controllers/pets')

// MONGO DB CONNECTION
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

// MIDDLEWARE
app.use(express.json())
app.use(logger('dev'))

// ROUTES
app.get('/', (req, res) => {
    res.send('did it work?')
})
app.use('/pets', petRouter)

app.listen(3000, () => {
    console.log('The express app is ready!')
})