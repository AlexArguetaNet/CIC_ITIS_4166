const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Get: get the sign up form
router.get('/signup', userController.signup);

// POST: create a new user
router.post('/profile', userController.createUser);


// Get: get the login form
router.get('/login', userController.login);


// Get: get the profile page
router.get('/profile', userController.profile);



module.exports = router;