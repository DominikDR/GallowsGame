const Express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const phrasesRoute = require('./routes/phrasesRoute');

const hostname = 'localhost';
const port = 3000;
const app = new Express();
const server = new http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.use(Express.static('dist'));
app.use('/phrases', phrasesRoute);

server.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server running at http://${hostname}:${port}/`); // eslint-disable-line no-console
    }
});
