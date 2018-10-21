const express = require('express');
const phrases = require('../phrases');
const sample = require('lodash.sample');
const pick = require('lodash.pick');

const routes = express.Router();

const gameState = {};
let counterID = 0;
const gameStateKeys = ["id", "category", "failsCounter", "encodedPhrase"];

const createNewGame = () => {
    let incrementedID = counterID++;
    const newPhrase = getRandomPhrase();
    console.log("newphrase", newPhrase);
    gameState[incrementedID] = {
        id: incrementedID,
        category: newPhrase.category,
        phrase: newPhrase.phrase,
        failsCounter: 0,
        encodedPhrase: encryptPhrase(newPhrase.phrase),
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
    console.log("newGame", reducedNewGame);
    res.send(reducedNewGame);
});

const  revealLetterInPhrase = (fullPhrase, partPhrase, letter) => {
    const phraseSplitted = fullPhrase.split('');
    const partPhraseSplitted = partPhrase.split('');
    console.log("partPhrase", partPhrase)
    const revealedLetterInPhrase = phraseSplitted
        .map((element, index) => {
            const revealedLetters = (element === letter) ? letter : partPhraseSplitted[index];
            return revealedLetters;
        })
        .join('');
    console.log("revealedLetterInPhrase",revealedLetterInPhrase)    
    return revealedLetterInPhrase;
}

routes.post('/check', (req, res) => {
    const gameStatus = gameState[req.query.id];
    let gameStateForClient;
    if (gameStatus) {
        if (gameStatus.phrase.includes(req.query.letter)) {
            // fn revealLetterInPhrase receive two parameters, full phrase, part phrase and letter. FN have to return string only with revealed letters.
            //Here in if we have to replace gameState with above newPhrase and return it.
            const revealedPhrase = revealLetterInPhrase(gameStatus.phrase, gameStatus.encodedPhrase, req.query.letter);
            gameState[req.query.id].encodedPhrase = revealedPhrase;
            gameStateForClient = pick(gameState[req.query.id], gameStateKeys)
            console.log("dupadupa", gameState);
            res.send(gameStateForClient);
            return;
        } else {
            //else return gameState only with changed failsCounter.
            ++gameState[req.query.id].failsCounter;
            gameStateForClient = pick(gameState[req.query.id], gameStateKeys)
            console.log("dupadupa2", gameState);
            res.send(gameStateForClient);
        }
    } else res.sendStatus(404).send("Sorry can't find that!") // Here we have to response 404
});

module.exports = routes;