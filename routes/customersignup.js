const express = require('express')
const router = express.Router()
const {validatingAndCollectionOfInputs} = require('../controllers/customer')



router.post('/register',validatingAndCollectionOfInputs)















module.exports = router