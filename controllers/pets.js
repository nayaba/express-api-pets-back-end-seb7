const Pet = require('../models/pet')
const express = require('express')
const router = express.Router()


// GET ROUTE (TEST)
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find()
        res.json(foundPets)
    } catch(err) {
        res.json({ msg: err.message })
    }
})

// POST A NEW PET
router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body)
        res.json(createdPet)
    } catch (err) {
        const message = { msg: err.message }
        res.json(message)
    }
})



module.exports = router