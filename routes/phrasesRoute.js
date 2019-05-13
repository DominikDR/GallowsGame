const express = require('express');
const pick = require('lodash.pick');
const { gameState, createNewGame, revealLetterInPhrase } = require('../gameServerLogic/gameServerLogic');
const { GAME_STATE_FAILED, GAME_STATE_WON, MAX_ATTEMPTS, GAME_STATE_KEYS } = require('../consts');

const routes = express.Router();

routes.get('/new', (req, res) => {
    const newGame = createNewGame();
    const reducedNewGame = pick(newGame, GAME_STATE_KEYS);
    res.send(reducedNewGame);
});

routes.post('/check', (req, res) => {
    const gameStatus = gameState[req.body.gameID];
    const { phrase } = gameStatus;
    if (!gameStatus) {
        return res.sendStatus(404).send("Sorry can't find that!");
    }

    let isLetterCorrect;

    if (phrase.includes(req.body.letter)) {
        const revealedPhrase = revealLetterInPhrase(phrase, gameStatus.encodedPhrase, req.body.letter);
        gameStatus.encodedPhrase = revealedPhrase;
        isLetterCorrect = true;
        if (gameStatus.encodedPhrase === phrase) gameStatus.endState = GAME_STATE_WON;
    } else {
        gameStatus.failsCounter += 1;
        isLetterCorrect = false;
        if (gameStatus.failsCounter === MAX_ATTEMPTS) gameStatus.endState = GAME_STATE_FAILED;
    }
    const gameStateForClient = pick(gameStatus, GAME_STATE_KEYS);
    gameStateForClient.isLetterCorrect = isLetterCorrect;
    return res.send(gameStateForClient);
});

module.exports = routes;
