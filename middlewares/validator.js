const { redirect } = require("express/lib/response");

exports.validateId = (req, res, next) => {

    let id = req.params.id;

    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        let err = new Error('Connection Id is invalid');
        err.status = 400;
        req.flash('error', 'Invalid connection Id');
        res.redirect('/connections');
    }

};