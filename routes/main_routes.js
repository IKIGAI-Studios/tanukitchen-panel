const routes = require('express').Router();


routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get('/test', (req, res) => {
    res.render('test');
});

routes.get('/control_panel', (req, res) => {
    res.render('control_panel');
});

routes.get('/recipes', (req, res) => {
    res.render('recipes');
});


module.exports = routes;