const routes = require('express').Router();
const { spawn } = require('child_process');
const fs = require('fs');
const Module = require('../models/moduleModel');
const moment = require('moment');

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
        const extractor = await Module.findOne({ name: "extractor" });

        const startTime = moment(extractor.max_active.startTime);
        const endTime = moment();
        const seconds = endTime.diff(startTime, 'seconds');

        await Module.findOneAndUpdate(
            {name: "extractor"},
            {
              active: false,
              "max_active.endTime": moment().toISOString(),
              'max_active.seconds': seconds > extractor.max_active.seconds ? seconds : extractor.max_active.seconds
            }
        );
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/start_extractor', async(req, res) => {
    try {
        await Module.findOneAndUpdate(
            {name: "extractor"},
            {
              active: true,
              $inc: {activations: 1},
              "max_active.startTime": moment().toISOString()
            }
          );
        res.json(true)
    } catch (e) {
        res.json(`Error: ${e}`)
    }
});

routes.get('/stop_stove', async(req, res) => {
    try {
        const stove = await Module.findOne({ name: "stove" });

        const startTime = moment(stove.time_usage.startTime);
        const endTime = moment();
        const seconds = endTime.diff(startTime, 'seconds');
        const totalSeconds = stove.time_usage.seconds + seconds;

        await Module.findOneAndUpdate(
            {name: "stove"}, 
            {
                active: false,
                "time_usage.endTime": moment().toISOString(),
                "time_usage.seconds": totalSeconds
            }
        );
        res.json(true)
    } catch (e) {
        res.json(!true)
    }
});

routes.get('/start_stove', async(req, res) => {
    try {
        await Module.findOneAndUpdate(
            {name: "stove"}, 
            {
                active: true, 
                $inc: {activations: 1},
                "time_usage.startTime": moment().toISOString()
            }
        );
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

routes.get('/modules', async (req, res) => {
    let rawdata = fs.readFileSync(process.env.JSON_ROUTE);
    let modules = await JSON.parse(rawdata);
    res.json(modules);
});

module.exports = routes;