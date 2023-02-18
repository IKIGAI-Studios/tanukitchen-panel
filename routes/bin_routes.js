const routes = require('express').Router();
const { spawn } = require('child_process');
const fs = require('fs');

routes.get('/stop_server', (req, res) => {

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
});

routes.get('/start_server', (req, res) => {

    let command = spawn('python', ['/Users/erickpinzon/Documents/GitHub/tanukitchen-panel/python/bin/start.py']);

    command.on('exit', (code, signal) => {
        console.log(`child process started with code ${code} and signal ${signal}`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/modules', (req, res) => {
    let rawdata = fs.readFileSync('C:/Users/erick/Documents/GitHub/tanukitchen-panel/python/modulos.json');
    let modules = JSON.parse(rawdata);
    res.json(modules);
});

module.exports = routes;