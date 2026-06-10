const express = require('express');
const client = require('prom-client'); //Metric collection
const doSomeHeavyTask = require('./util');

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register});


app.get('/', (req, res) => {
    return res.json({
        message: 'Hello from Express Server'
    });
});

app.get('/slow', async(req, res) => {
    try{
        const timeTake = await doSomeHeavyTask();
        return res.json({
            status: 'Success',
            message: `Heavy Task completed in ${timeTake} ms`,
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                status: 'Error',
                error: 'Internal Server Error'
            });
    }
});

app.get('/metrics', async(req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
})

app.listen(PORT, () => {
    console.log(`Express server is started at http://localhost:${PORT}`)
});