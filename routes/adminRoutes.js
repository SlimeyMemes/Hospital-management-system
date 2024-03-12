const express = require('express');
const{ doctorController, doctorData, updateDoctor, updateDoctorProfile, removeDoctor }= require('../controllers/adminController');


const router = express.Router()

//addDoctor

router.post('/addDoctor',doctorController);
router.get('/getDoctors',doctorData);
router.post('/updateDoctor',updateDoctor);
router.post('/updateDoctorProfile',updateDoctorProfile)
router.post('/removeDoctor',removeDoctor)

module.exports = router; 