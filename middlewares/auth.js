const Connection = require('../models/connection');

// Check if the user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
};


// Check if the user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to login first');
        return res.redirect('/user/login');
    }
};


// Check if the user is the creator of a connection
exports.isAuthor = (req, res, next) => {

    let id = req.params.id;

    Connection.findById(id)
    .then(connection => {
        if (connection) {
            if (connection.creator == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));

};