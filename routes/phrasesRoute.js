const express = require('express');
const phrases = require('../phrases');
const sample = require('lodash.sample');
const pick = require('lodash.pick');

const routes = express.Router();

const gameState = {};
let counterID = 0;

const createNewGame = () => {
    let incrementedID = counterID++;
    const newPhrase = getRandomPhrase();
    gameState[incrementedID] = {
        id: incrementedID,
        phrase: newPhrase,
        failsCounter: 0,
        encodedPhrase: encryptPhrase(newPhrase),
    }
    return gameState[incrementedID];
}

const ommitedChars = [' ', '-'];

const getRandomPhrase = () => {
    return sample(sample(phrases)).toUpperCase();
}

const encryptPhrase = (phrase) => {
    const encryptedString = phrase.split('').map(letter => {
        if(ommitedChars.includes(letter)) {
            return letter;
        }
        return '_';
    }).join('');
    return encryptedString;
}

routes.get('/new', (req, res) => {
    const newGame = createNewGame();
    const reducedNewGame = pick(newGame, ["id", "failsCounter", "encodedPhrase"]);
    console.log("newGame", reducedNewGame);
    res.send(reducedNewGame);
});

module.exports = routes;