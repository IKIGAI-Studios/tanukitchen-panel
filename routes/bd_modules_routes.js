const routes = require('express').Router();
const { spawn } = require('child_process');
const { json } = require('express');
const fs = require('fs');
const Module = require('../models/moduleModel');
const Recipe = require('../models/recipeModel');

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

module.exports = routes;