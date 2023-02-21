const routes = require('express').Router();
const { spawn } = require('child_process');
const fs = require('fs');

routes.get('/stop_server', (req, res) => {
    console.log(process.env.PYTHON_TBIN);
    let command = spawn('python', [process.env.PYTHON_TBIN + '/stop.py']);

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

    let command = spawn('python', [process.env.PYTHON_TBIN + '/start.py']);

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

routes.get('/stop_extractor', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/extractorOff.py']);

    command.on('exit', (code, signal) => {
        console.log(`Extractor Off`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/start_extractor', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/extractorOn.py']);

    command.on('exit', (code, signal) => {
        console.log(`Extractor On`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/stop_scale', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/scaleOff.py']);

    command.on('exit', (code, signal) => {
        console.log(`Scale Off`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/start_scale', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/scaleOn.py']);

    command.on('exit', (code, signal) => {
        console.log(`Scale On`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/stop_smoke', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/smokeOff.py']);

    command.on('exit', (code, signal) => {
        console.log(`Smoke Off`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/start_smoke', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/smokeOn.py']);

    command.on('exit', (code, signal) => {
        console.log(`Smoke On`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/stop_stove', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/stoveOff.py']);

    command.on('exit', (code, signal) => {
        console.log(`Stove Off`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/start_stove', (req, res) => {

    let command = spawn('python', [process.env.PYTHON_TBIN + '/stoveOn.py']);

    command.on('exit', (code, signal) => {
        console.log(`Stove On`);
    });

    command.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    res.redirect('../../test');
});

routes.get('/modules', async (req, res) => {
    let rawdata = await fs.readFileSync(process.env.JSON_ROUTE);
    let modules = JSON.parse(rawdata);
    res.json(modules);
});

module.exports = routes;