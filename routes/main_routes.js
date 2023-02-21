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
        let kitchen = await Kitchen.find({name:req.body.username, active: true});
        let usr = await User.find({id_kitchen:kitchen[0]._id, active: true});
        obj = {"user": usr, "kitchen": kitchen[0]};
        if(kitchen.length != 0) {
            if(kitchen[0]['password'] == req.body.password) res.render('selectUsr', obj); /*res.redirect('/control_panel/'+rslt[0]['name']); /*$.redirect("/control_panel", {user: rslt[0]['user']}, "POST");*/
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

routes.get('/control_panel/:user', async (req, res) => {
    try {
        let usr = await User.find({user:req.params.user, active: true});
        let kitchen = await Kitchen.find({id:usr.id_kitchen, active: true});
        obj = {"user": usr[0], "kitchen": kitchen[0]};
        res.render('control_panel', obj);
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});

routes.get('/recipes/:user', async(req, res) => {
    try {
        let usr = await User.find({user:req.params.user, active: true});
        let kitchen = await Kitchen.find({id:usr.id_kitchen, active: true});
        obj = {"user": usr[0], "kitchen": kitchen[0]};
        res.render('recipes', obj);
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});


module.exports = routes;