const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/cars', carController.createCar);
router.get('/cars', carController.getCars);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);
router.get('/cars-json', carController.getCarsJSON);

module.exports = router;
