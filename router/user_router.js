const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.post('/',userController.userRegister);
router.post('/login',userController.login);
//router.post('/refresh',userController.refreshtoken);

module.exports = router;
