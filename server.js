const express = require('express');
const phrasesRoute = require('./routes/phrasesRoute');
const hostname = 'localhost';
const port = 3000;
const app = new express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));
app.use('/phrases', phrasesRoute);

app.listen(3000, hostname, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server running at http://${hostname}:${port}/`);        
    }
});