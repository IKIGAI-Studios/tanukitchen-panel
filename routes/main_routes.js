const routes = require('express').Router();
const User = require('../models/userModel');
const Kitchen = require('../models/kichenModel');
const Recipe = require('../models/recipeModel');
const { Configuration, OpenAIApi } = require("openai");
let obj = {};

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
            if(kitchen[0]['password'] == req.body.password) {
                // LA NETA ESTA COSA ANDA ENOJADA ENTONCES PRIMERO RECIBIA OBJ SIN ENVIARSELO Y LUEGO SE ENOJO DE K NO QUERIA QUE LO RECIBIERA ASI QUE SI PASAS
                // OBJETOS COMO PARAMETRO DEL RENDER NO TE LOS MUESTRA ASI QUE LO PASAMOS POR LOCALS EN LO K SE DESENOJA PK YA ME ENOJE YO
                // ATTE: PI (mood enojado neta pk desperdicie 3 horas de mi vida aqui, ya me voy a jugar rocket alch)
                res.locals.obj = obj;
                res.render('selectUsr');
            }
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

routes.get('/userSelect/:user', async (req, res) => {
    try {
        let usr = await User.find({user:req.params.user, active: true});
        let kitchen = await Kitchen.find({id:usr.id_kitchen, active: true});
        obj = {"user": usr[0], "kitchen": kitchen[0]};
        req.session.user = obj;
        res.redirect('/control_panel');
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.redirect('/login');
    }
});

routes.get('/control_panel', (req, res) => {
    try {
        console.log(req.session && req.session.user)
        if (req.session && req.session.user) {
            res.locals.obj = req.session.user;
            res.render('control_panel');
        } else {
            // Si no hay una sesión abierta, redirigir al usuario a la página de inicio de sesión
            res.redirect('/login');
        }
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.redirect('/login');
    }
});

routes.get('/recipes', (req, res) => {
    try {
        if (req.session && req.session.user) {
            res.locals.obj = req.session.user;
            res.render('recipes');
        } else {
            // Si no hay una sesión abierta, redirigir al usuario a la página de inicio de sesión
            res.redirect('/login');
        }
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});

routes.get('/recipe/:id', async(req, res) => {
    try {
        if (req.session && req.session.user) {
            let rslt = await Recipe.find({_id: req.params.id})
            let ses = req.session.user;
            let recipe = rslt[0];
            obj = {user: ses.user, kitchen: ses.kitchen, recipe: recipe};
            res.locals.obj = obj;
            res.render('stepsRecipes');
        } else {
            // Si no hay una sesión abierta, redirigir al usuario a la página de inicio de sesión
            res.redirect('/login');
        }
    } catch (e) {
        code = {msj: `Error ${e}`};
        res.render('login', code)
    }
});

routes.get('/chat-gpt/:msj', async(req, res) => { 
    const configuration = new Configuration({
        apiKey: process.env.API_KEY_CHATGPT,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.params.msj,
        max_tokens: 3000,
    });
    res.json(completion.data.choices[0].text);
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
    obj = req.session.user;
    res.render('test');
});

module.exports = routes;