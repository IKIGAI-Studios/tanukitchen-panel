const routes = require('express').Router();
const { spawn } = require('child_process');
const { json } = require('express');
const fs = require('fs');
const Module = require('../models/moduleModel');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel')

routes.get('/getModules/', async(req, res) => {
    try {
        if(req.session && req.session.user) {
            res.json(await Module.find({id_kitchen: req.session.user.kitchen.name}));
        } else res.json(false)
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/getUser/:user', async(req, res) => {
    try {
        if(req.session && req.session.user) {
            res.json(await User.find({user: req.params.user}));
        } else res.json(false)
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
        let usr = session.user.user
        let userObj = await User.find({user: usr});

        let pos = -1
        userObj[0].count_recipes.map((obj, i) => {
            if(obj.name == req.params.recipe) pos = i
        })
        if (pos < 0) {
            let recipe = req.params.recipe
            await User.updateOne(
                { "user": usr },
                { 
                    $push: { "count_recipes": { "name": recipe, "count": 1 } },
                    $set: { "last_recipe": recipe } 
                });
            userObj = await User.find({user: usr});
            res.json(userObj)
        }
        else {
            let count = userObj[0].count_recipes[pos].count + 1
            let recipe = req.params.recipe
            await User.updateOne(
                { "user": usr, "count_recipes.name": recipe },
                { $set: { "count_recipes.$.count": count, "last_recipe": recipe } });
            userObj = await User.find({user: usr});
            res.json(userObj)
        }
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/setTempTarget/:tmp', async(req, res) => {
    try {
        let session = req.session.user
        let ktch = session.kitchen.name
        await Module.updateOne(
            { id_kitchen: ktch, name: "stove" },
            { $set: { target: req.params.tmp } });
        res.json(true)
    } catch (e) {
        console.error(`Error: ${e}`);
        res.json(false)
    }
});

module.exports = routes;