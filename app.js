// Require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const mongoose = require('mongoose');

// Create app
const app = express();

// Configure app
let port = 3000;
let host = 'localhost'
let url = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');


// Connect to MongoDb
mongoose.connect(url)
.then(()=> {
    //start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));



// Mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


// Set up routes
app.use('/main', mainRoutes);
app.use('/connections', connRoutes);


// Setting up error page
app.use((req, res, next) => {

    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {

    console.log(err.stack);

    if (!err.status) {
        err.status = 500;
        err.message = ("Internal server error");
    }

    res.status(err.status);
    res.render('error', {error: err});

});





// TODO: Reformat dates and times.
