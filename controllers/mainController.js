const { render } = require('express/lib/response');
const { nextTick } = require('process');


exports.about = (req, res) => {
    res.render('./about');
};


exports.contact = (req, res) => {
    res.render('./contact');
};

exports.home = (req, res) => {
    res.render('./index');
;}


