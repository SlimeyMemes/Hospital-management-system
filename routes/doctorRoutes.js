const express = require('express');
const {addAppointment,getAppointment, removeAppointment,completeAppointment,getCompletedAppointments} = require('../controllers/appointmentController.js');


const router = express.Router()


router.post('/addAppointment',addAppointment);
router.post('/getAppointment',getAppointment);
router.post('/removeAppointment',removeAppointment)
router.post('/completeAppointment',completeAppointment)
router.post('/getCompletedAppointments',getCompletedAppointments)
module.exports = router;