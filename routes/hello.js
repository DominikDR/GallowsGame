const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello');
});

routes.get('/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}`);
});

module.exports = routes;