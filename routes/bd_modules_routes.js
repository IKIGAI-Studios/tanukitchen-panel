const routes = require('express').Router();
const { spawn } = require('child_process');
const { json } = require('express');
const fs = require('fs');
const Module = require('../models/moduleModel');

routes.get('/getModules/', async(req, res) => {
    try {
        res.json(await Module.find());
    } catch (e) {
        console.error(`Error: ${e}`);
    }
});

routes.get('/getValue/:name', async(req, res) => {
    try {
        res.json(await Module.find({name:req.params.name}));
        let command = spawn('python', ['/Users/erickpinzon/Documents/GitHub/tanukitchen-panel/python/bin/stop.py']);

        command.on('exit', (code, signal) => {
            console.log(`child process exited with code ${code} and signal ${signal}`);
        });

        command.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
        });

        command.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });

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