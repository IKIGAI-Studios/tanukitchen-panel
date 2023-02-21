const routes = require('express').Router();
const User = require('../models/userModel');
const $ = require('jquery');

routes.get('/login', (req, res) => {
    code = {msj: ""};
    res.render('login', code);
});

routes.post('/login', async (req, res) => {
    let rslt = await User.find({user:req.body.username, active: true});
    if(rslt.length != 0) {
        if(rslt[0]['password'] == req.body.password) res.redirect('/control_panel/'+rslt[0]['user']); /*$.redirect("/control_panel", {user: rslt[0]['user']}, "POST");*/
        else {
            code = {msj: "Password invalid"};
            res.render('login', code);
        } 
    } else {
        code = {msj: "User no existe"};
        res.render('login', code);
    } 
});

routes.get('/test', (req, res) => {
    res.render('test');
});

routes.get('/control_panel/:user', async (req, res) => {
    let rslt = await User.find({user:req.params.user, active: true});
    obj = {name: rslt[0]['name']}
    res.render('control_panel', obj);
});

routes.post('/control_panel/', async (req, res) => {
    res.json(req.body.user);
    //let rslt = await User.find({user:req.body.user, active: true});
    //res.render('control_panel', rslt);
});

routes.get('/recipes', (req, res) => {
    res.render('recipes');
});


module.exports = routes;