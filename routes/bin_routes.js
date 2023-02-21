const routes = require('express').Router();
const { spawn } = require('child_process');
const fs = require('fs');
const Module = require('../models/moduleModel');

routes.get('/stop_server', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "tanukitchen"}, {active: false});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/start_server', async (req, res) => {
    try {
        await Module.findOneAndUpdate({name: "tanukitchen"}, {active: true});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/stop_extractor', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "extractor"}, {active: false});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/start_extractor', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "extractor"}, {active: true});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/stop_scale', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "scale"}, {active: false});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
   }
});

routes.get('/start_scale', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "scale"}, {active: true});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/stop_smoke', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "smoke_detector"}, {active: false});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/start_smoke', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "smoke_detector"}, {active: true});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/stop_stove', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "stove"}, {active: false});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/start_stove', async(req, res) => {
    try {
        await Module.findOneAndUpdate({name: "stove"}, {active: true});
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/modules', async (req, res) => {
    let rawdata = fs.readFileSync(process.env.JSON_ROUTE);
    let modules = await JSON.parse(rawdata);
    res.json(modules);
});

module.exports = routes;