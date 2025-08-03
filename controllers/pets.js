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


// SHOW ONE PET
router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId)

        // if pet is not found
        if (!foundPet) {
            res.status(404)
            throw new Error('Pet not found.')
        }

        res.status(200).json(foundPet)
    } catch (err) {

        // what if it's a 404?
        if (res.statusCode === 404) {
            res.json({ msg: err.message })
        }
        res.status(500).json({ msg: err.message })  
    }
})


module.exports = router