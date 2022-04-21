const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');


// Get: get the sign up form
router.get('/signup', isGuest, userController.signup);

// POST: create a new user
router.post('/profile', isGuest, userController.createUser);


// Get: get the login form
router.get('/login', isGuest, userController.login);

// POST: process login request
router.post('/login', isGuest, userController.processLogin);


// Get: get the profile page
router.get('/profile', isLoggedIn, userController.profile);


// Get: logout the user
router.get('/logout', isLoggedIn,userController.logout);



module.exports = router;