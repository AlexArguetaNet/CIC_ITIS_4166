const User = require('../models/user');
const Connection = require('../models/connection');
const flash = require('connect-flash');
const { append } = require('express/lib/response');
const { urlencoded } = require('express');

// Get: get the sign up form
exports.signup = (req, res) => {
    res.render('./users/signup');
};

// POST: create a new user
exports.createUser = (req, res) => {

    let user = new User(req.body);

    user.save()
    .then(() => {
        req.flash('success', 'You have successfully signed up!');
        res.redirect('/users/login')
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/signup');
        }

        if (err.code === 11000) {
            req.flash('error', 'Email address has been used!');
            return res.redirect('/users/signup');
        }
    });

    // console.log(user);
    // res.redirect('/user/profile');
};



// Get: get the login form
exports.login = (req, res) => {
    res.render('./users/login');
}

// POST: process login request
exports.processLogin = ('/login', (req, res) => {

    // Authenticate user's login request
    let email = req.body.email;
    let password = req.body.password;

    // Get the user that matches the email
    User.findOne({email: email})
    .then(user => {
        if (user) {

            // user found in the database
            user.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.user = user._id; // store user's id in the session
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
                } else {
                    req.flash('error', 'Wrong password!');
                    res.redirect('/users/login');
                }
            });
            

        } else {
            req.flash('error', 'Wrong email address!');
            res.redirect('/users/login');
        }
    })
    .catch(err => next(err));


});



// Get: get the profile page
exports.profile = (req, res) => {

    let id = req.session.user;
    Promise.all([User.findById(id), Connection.find({hostName: id})])
    .then(results => {
        const [user, connections] = results;
        
        console.log(user);

        res.render('./users/profile', {user, connections})
    })
    .catch(err => next(err));
}


// Get: logout the user
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/main/')
        }
    });
};


