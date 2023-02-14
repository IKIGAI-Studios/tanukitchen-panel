const routes = require('express').Router();
const product = require('../models/productModel');

routes.get('/login', (req, res) => {
    res.render('login');
});

module.exports = routes;