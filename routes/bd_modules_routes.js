const routes = require('express').Router();
const { spawn } = require('child_process');
const { json } = require('express');
const fs = require('fs');
const Module = require('../models/moduleModel');
const Recipe = require('../models/recipeModel');

routes.get('/getModules/', async(req, res) => {
    try {
        res.json(await Module.find());
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

module.exports = routes;