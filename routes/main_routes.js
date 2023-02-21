const routes = require('express').Router();
const User = require('../models/userModel');
const Kitchen = require('../models/kichenModel');
const $ = require('jquery');

routes.get('/login', (req, res) => {
    code = {msj: ""};
    res.render('login', code);
});

routes.post('/login', async (req, res) => {
    try {
        let rslt = await Kitchen.find({name:req.body.username, active: true});
        if(rslt.length != 0) {
            if(rslt[0]['password'] == req.body.password) res.redirect('/control_panel/'+rslt[0]['name']); /*$.redirect("/control_panel", {user: rslt[0]['user']}, "POST");*/
            else {
                code = {msj: "Password invalid"};
                res.render('login', code);
            } 
        } else {
            code = {msj: "User no existe"};
            res.render('login', code);
        } 
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});

routes.post('/register', async (req, res) => {
    try {
        req.body.active = true;
        const user = new User(req.body);
        await user.save();
        code = {msj: "User creado"};
        res.render('login', code);
    } catch(e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});

routes.get('/test', (req, res) => {
    res.render('test');
});

routes.get('/control_panel/:name', async (req, res) => {
    try {
        let kitchen = await Kitchen.find({name:req.params.name, active: true});
        let usr = await User.find({id_kitchen:kitchen[0]._id, active: true});
        obj = {"user": usr[0], "kitchen": kitchen[0]};
        res.render('control_panel', obj);
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});

routes.get('/recipes/:name', async(req, res) => {
    try {
        let kitchen = await Kitchen.find({name:req.params.name, active: true});
        let usr = await User.find({id_kitchen:kitchen[0]._id, active: true});
        obj = {"user": usr[0], "kitchen": kitchen[0]};
        res.render('recipes', obj);
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});


module.exports = routes;