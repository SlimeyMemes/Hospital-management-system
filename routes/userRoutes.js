const express = require('express');
const { loginController, registerController, authCtrl } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router
const router = express.Router()
//routes
//login
router.post('/register',registerController)
//register
router.post('/login',loginController)

//Auth
router.post('/getUser',authMiddleware, authCtrl)
module.exports = router; 