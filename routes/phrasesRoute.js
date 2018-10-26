const express = require('express');
const bodyParser = require('body-parser');
const phrases = require('../phrases');
const sample = require('lodash.sample');
const pick = require('lodash.pick');

const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

const gameState = {};
let counterID = 0;
const gameStateKeys = ["id", "category", "failsCounter", "encodedPhrase", "endState"];

const createNewGame = () => {
    let incrementedID = counterID++;
    const newPhrase = getRandomPhrase();
    gameState[incrementedID] = {
        id: incrementedID,
        category: newPhrase.category,
        phrase: newPhrase.phrase,
        failsCounter: 0,
        encodedPhrase: encryptPhrase(newPhrase.phrase),
        endState: null,
    }
    return gameState[incrementedID];
}

const getRandomPhrase = () => {
    const randomCategory = sample(Object.keys(phrases));
    const upperPhrase = sample(phrases[randomCategory]).toUpperCase();
    return {
        category: randomCategory,
        phrase: upperPhrase,
    };
}

const ommitedChars = [' ', '-'];

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
    const reducedNewGame = pick(newGame, gameStateKeys);
    res.send(reducedNewGame);
});

const revealLetterInPhrase = (fullPhrase, partPhrase, letter) => {
    const phraseSplitted = fullPhrase.split('');
    const partPhraseSplitted = partPhrase.split('');
    const revealedLetterInPhrase = phraseSplitted
        .map((element, index) => {
            const revealedLetter = (element === letter) ? letter : partPhraseSplitted[index];
            return revealedLetter;
        })
        .join('');
    return revealedLetterInPhrase;
}

routes.post('/check', (req, res) => {
    const gameStatus = gameState[req.body.id];
    let gameStateForClient;
    if (gameStatus) {
        if (gameStatus.phrase.includes(req.body.letter)) {
            // fn revealLetterInPhrase receive two parameters, full phrase, part phrase and letter. FN have to return string only with revealed letters.
            //Here in if we have to replace gameState with above newPhrase and return it.
            const revealedPhrase = revealLetterInPhrase(gameStatus.phrase, gameStatus.encodedPhrase, req.body.letter);
            gameStatus.encodedPhrase = revealedPhrase;
            if (gameStatus.encodedPhrase === gameStatus.phrase) gameStatus.endState = 1;

            gameStateForClient = pick(gameStatus, gameStateKeys);
            console.log("dupadupa", gameState);
            res.send(gameStateForClient);
            return;
        } else {
            //else return gameState only with changed failsCounter.
            ++gameStatus.failsCounter;
            if (gameStatus.failsCounter === 6) gameStatus.endState = 0;

            gameStateForClient = pick(gameStatus, gameStateKeys);
            console.log("dupadupa2", gameState);
            res.send(gameStateForClient);
        }
    } else res.sendStatus(404).send("Sorry can't find that!") // Here we have to response 404
});

module.exports = routes;