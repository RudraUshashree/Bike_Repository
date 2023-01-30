const express = require('express');
const router = express.Router();
const bikeTypeController = require('../controller/bikeType_controller');

router.get('/',bikeTypeController.getAllBikeTypes);
router.post('/',bikeTypeController.addBikeType);

module.exports = router;