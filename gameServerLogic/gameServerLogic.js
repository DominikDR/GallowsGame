const phrases = require('../phrases');
const sample = require('lodash.sample');

const gameState = {};
let counterID = 0;

const createNewGame = () => {
    let incrementedID = counterID++;
    const newPhrase = getRandomPhrase();
    gameState[incrementedID] = {
        gameID: incrementedID,
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

module.exports = { gameState, counterID, ommitedChars, createNewGame, getRandomPhrase, encryptPhrase, revealLetterInPhrase };
