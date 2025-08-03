const Pet = require('../models/pet')
const express = require('express')
const router = express.Router()


// GET ROUTE (TEST)
router.get('/', (req, res) => {
    res.send('🙃')
})



module.exports = router