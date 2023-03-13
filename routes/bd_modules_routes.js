const routes = require('express').Router();
const { spawn } = require('child_process');
const { json } = require('express');
const fs = require('fs');
const Module = require('../models/moduleModel');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel')

routes.get('/getModules/', async(req, res) => {
    try {
        res.json(await Module.find({id_kitchen: req.session.user.kitchen.name}));
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/getAvgValues/:module', async(req, res) => {
    try {
        res.json(await Module.aggregate([
            { $match: { name: req.params.module, id_kitchen: req.session.user.kitchen.name } }, // filtrar por el nombre del objeto
            { $unwind: "$values" }, // desagregar el arreglo values
            { $group: { _id: null, averageValue: { $avg: "$values.value" }}}
        ]));
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/getRecipes/', async(req, res) => {
    try {
        res.json(await Recipe.find());
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/getRecipe/:id', async(req, res) => {
    try {
        res.json(await Recipe.find({_id: req.params.id}));
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/getValue/:name', async(req, res) => {
    try {
        res.json(await Module.find({name:req.params.name}));

        res.redirect('../../test');
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/setValue/:name/:value', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name:req.params.name}, {value:req.params.value});
        res.redirect('localhost:3000/test')
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/updateRecipesCount/:recipe', async(req, res) => {
    try {
        let session = req.session.user
        let pos = -1
        session.user.count_recipes.map((obj, i) => {
            if(obj.name == req.params.recipe) pos = i
        })
        if (pos < 0) res.json(false)
        else {
            count = session.user.count_recipes[pos].count + 1
            await User.findOneAndUpdate({user: session.user.user, "count_recipes.name": req.params.recipe}, {"count_recipes.count": count});
            let usr = await User.find({user: session.user.user});
            console.log(session.user.count_recipes[pos].count)
            res.json(usr)
        }
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

module.exports = routes;