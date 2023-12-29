const express = require('express');
const { loginController, registerController } = require('../controllers/userCtrl');

//router
const router = express.Router()
//routes
//login
router.post('/register',registerController)
//register
router.post('/login',loginController)
module.exports = router; 