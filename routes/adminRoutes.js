const express = require('express');
const{ doctorController, doctorData }= require('../controllers/adminController');


const router = express.Router()

//addDoctor

router.post('/addDoctor',doctorController);
router.post('/getDoctor',doctorData);

module.exports = router; 