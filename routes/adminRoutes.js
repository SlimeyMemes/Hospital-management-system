const express = require('express');
const{ doctorController, doctorData }= require('../controllers/adminController');


const router = express.Router()

//addDoctor

router.post('/addDoctor',doctorController);
router.get('/getDoctors',doctorData);
router.get('/getDoctor',doctorData);

module.exports = router; 