const Pet = require('../models/pet')
const express = require('express')
const router = express.Router()

// GET ROUTE (TEST)
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find()
        res.status(200).json(foundPets)
    } catch(err) {
        res.status(500).json({ msg: err.message })
    }
})

// POST A NEW PET
router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body)
        res.status(200).json(createdPet)
    } catch (err) {
        const message = { msg: err.message }
        res.status(500).json(message)
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

// DELETE ONE PET
router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId)
        
        if (!deletedPet) {
            res.status(404)
            throw new Error('Pet not found.')
        }

        res.status(200).json(deletedPet)
    } catch(err) {
        if(res.statusCode === 404) {
            res.json({ msg: err.message })
        }
        res.status(500).json({ msg: err.message }) 
    }
})

// UPDATE A SINGLE PET
router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {new: true})

        if (!updatedPet) {
            res.status(404)
            throw new Error('Pet not found')
        }

        res.status(200).json(updatedPet)
    } catch(err) {
        if (res.statusCode === 404) {
            res.json({ msg: err.message })
        }
        res.status(500).json({ msg: err.message }) 
    }
})


module.exports = router