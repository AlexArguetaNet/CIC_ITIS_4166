const model = require('../models/connection');


// Get /connections: Send all connections to the user
exports.index = (req, res, next) => {

    // Create empty array to store the categories
    categories = [];

    let connections = model.find()
    .then(connections=>{

        // Put the categories of all the cnnections in an array
        for (let i = 0; i < connections.length; i++) {
            categories.push(connections[i].topic);
        }

        // Making sure that the categories array is a unique set
        categories = categories.filter(function (value, index, self){
            return self.indexOf(value) === index;
        });

        // Render the page to list all of the connections
        res.render('./connection/index', {connections: connections, categories: categories})
    })
    .catch(err=>next(err));

};

// Render form to create new connection
exports.new = (req, res) => {
    res.render('./connection/newConnection');
};

// Create a new connection
exports.create = (req, res, next) => {

    let connection = new model(req.body); // Create a new connection document

    // Make sure field names in the newConnection.ejs
    // are the same names defined in the model schema
    console.log(req.body);

    connection.save()
    .then((connection)=> {
        res.redirect('/connections');

        // Keep track of categories
        model.addCategory(connection.topic);


    })
    .catch(err=> {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });

};



// Show individual connection
exports.show = (req, res, next) => {

    let id = req.params.id;
    // An objectId is a 24-bit Hex string
    if (! id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(connection => {
        if (connection) {
            return res.render('./connection/show', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> next(err));

};


// Render form to edit a connection
exports.edit = (req, res, next) => {

    let id = req.params.id;
    
    if (! id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(connection=> {
        if (connection) {
            res.render('./connection/edit', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> next(err));

}


// Edit an existing connection
exports.update = (req, res, next) => {

    // Make sure the field names in edit.ejs
    // are the same in the model schema
    let connection = req.body;
    let id = req.params.id;

    if (! id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }


    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(story=> {
        if (connection) {
            res.redirect('/connections/' + id);
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });

};



// Deleting a connection
exports.delete = (req, res, next) => {

    let id = req.params.id;

    if (! id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false, runValidators: true})
    .then(connection=> {
        if (connection) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=> next(err));


};


