const Express = require('express');
const bodyParser = require('body-parser');
const phrasesRoute = require('./routes/phrasesRoute');

const hostname = 'localhost';
const port = 3000;
const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.use(Express.static('dist'));
app.use('/phrases', phrasesRoute);

app.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server running at http://${hostname}:${port}/`); // eslint-disable-line no-console
    }
});
