const express = require('express');
const { gameState, counterID, gameStateKeys, ommitedChars, createNewGame, getRandomPhrase, encryptPhrase, revealLetterInPhrase } = require('../gameServerLogic/gameServerLogic');
const { GAME_STATE_FAILED, GAME_STATE_WON } = require('../consts');
const pick = require('lodash.pick');

const routes = express.Router();

routes.get('/new', (req, res) => {
    const newGame = createNewGame();
    const reducedNewGame = pick(newGame, gameStateKeys);
    res.send(reducedNewGame);
});

routes.post('/check', (req, res) => {
    const gameStatus = gameState[req.body.id];
    let gameStateForClient;
    if (gameStatus) {
        if (gameStatus.phrase.includes(req.body.letter)) {
            const revealedPhrase = revealLetterInPhrase(gameStatus.phrase, gameStatus.encodedPhrase, req.body.letter);
            gameStatus.encodedPhrase = revealedPhrase;
            if (gameStatus.encodedPhrase === gameStatus.phrase) gameStatus.endState = GAME_STATE_WON;

            gameStateForClient = pick(gameStatus, gameStateKeys);
            res.send(gameStateForClient);
        } else {
            ++gameStatus.failsCounter;
            if (gameStatus.failsCounter === MAX_ATTEMPTS) gameStatus.endState = GAME_STATE_FAILED;

            gameStateForClient = pick(gameStatus, gameStateKeys);
            res.send(gameStateForClient);
        }
    } else res.sendStatus(404).send("Sorry can't find that!");
});

module.exports = routes;