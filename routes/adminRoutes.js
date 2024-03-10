const express = require('express');
const doctorController = require('../controllers/adminController');


const router = express.Router()

//addDoctor

router.post('/addDoctor',doctorController)

module.exports = router; 