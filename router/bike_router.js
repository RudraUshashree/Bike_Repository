const express = require('express');
const router = express.Router();
const bike_controller = require('../controller/bike_controller');
const upload = require('../middleware/upload');
//const authenticate = require('../middleware/authenticate');

router.post('/',upload.single('photo'),bike_controller.addBike);
router.get('/',bike_controller.getAllBikes);
router.post('/:id',bike_controller.updateBike);  
router.delete('/:id',bike_controller.deleteBike);  
router.get('/:id',bike_controller.getBikeByType);  
router.get('/:id',bike_controller.getAllBilkesByUser);  
router.post('/like/:bikeid',bike_controller.addLike);  
router.post('/comment/:bikeid',bike_controller.addComment); 
module.exports = router;