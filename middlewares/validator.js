exports.validateId = (req, res, next) => {

    let id = req.params.id;

    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        let err = new Error('Stroy Id is invalid');
            err.status = 400;
            next(err);
    }

};