const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/about', mainController.about);

router.get('/contact', mainController.contact);

router.get('/', mainController.home);



module.exports = router;