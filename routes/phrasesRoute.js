const express = require('express');
const { gameState, counterID, ommitedChars, createNewGame, getRandomPhrase, encryptPhrase, revealLetterInPhrase } = require('../gameServerLogic/gameServerLogic');
const { GAME_STATE_FAILED, GAME_STATE_WON, MAX_ATTEMPTS, GAME_STATE_KEYS } = require('../consts');
const pick = require('lodash.pick');

const routes = express.Router();

routes.get('/new', (req, res) => {
    const newGame = createNewGame();
    const reducedNewGame = pick(newGame, GAME_STATE_KEYS);
    res.send(reducedNewGame);
});

routes.post('/check', (req, res) => {
    const gameStatus = gameState[req.body.gameID];
    let gameStateForClient;
    if (gameStatus) {
        if (gameStatus.phrase.includes(req.body.letter)) {
            const revealedPhrase = revealLetterInPhrase(gameStatus.phrase, gameStatus.encodedPhrase, req.body.letter);
            gameStatus.encodedPhrase = revealedPhrase;
            if (gameStatus.encodedPhrase === gameStatus.phrase) gameStatus.endState = GAME_STATE_WON;
        } else {
            ++gameStatus.failsCounter;
            if (gameStatus.failsCounter === MAX_ATTEMPTS) gameStatus.endState = GAME_STATE_FAILED;
        } 
        gameStateForClient = pick(gameStatus, GAME_STATE_KEYS);
        res.send(gameStateForClient);
    } else res.sendStatus(404).send("Sorry can't find that!");
});

module.exports = routes;