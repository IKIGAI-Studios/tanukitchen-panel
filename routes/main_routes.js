const routes = require('express').Router();

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get('/test', (req, res) => {
    res.render('test');
});

module.exports = routes;