const routes = require('express').Router();
const product = require('../models/productModel');

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get('/test', (req, res) => {
    res.render('test');
});

module.exports = routes;