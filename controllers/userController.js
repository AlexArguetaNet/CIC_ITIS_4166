const User = require('../models/user');

// Get: get the sign up form
exports.signup = (req, res) => {
    res.render('./user/signup');
};

// POST: ccreate a new user
exports.createUser = (req, res) => {

    let user = new User(req.body);

    user.save()
    .then(() => res.redirect('/user/login'))
    .catch(err => console.log(err));

    // console.log(user);
    // res.redirect('/user/profile');
};



// Get: get the login form
exports.login = (req, res) => {
    res.render('./user/login');
}



// Get: get the profile page
exports.profile = (req, res) => {
    res.render('./user/profile');
}


