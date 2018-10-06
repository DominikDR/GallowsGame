const express = require('express');
const helloRoute = require('./routes/hello');
const hostname = 'localhost';
const port = 3000;
const app = new express();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));
app.use('/hello', helloRoute);

app.listen(3000, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});