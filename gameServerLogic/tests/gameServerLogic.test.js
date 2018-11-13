const { encryptPhrase, revealLetterInPhrase, getRandomPhrase, counterID, createNewGame } = require('../gameServerLogic');
const phrases = require('../../phrases');
const gameServerLogic = require('../gameServerLogic');

describe('encryptPhrase', () => {
    it('works with normal test case', () => {
        const mockedResult = '_____ _____';
        const realResult = encryptPhrase('lorem ipsum');
        expect(realResult).toEqual(mockedResult);
    });

    it('returns empty string for empty phrase', () => {
        const mockedResult = '';
        const realResult = encryptPhrase('');
        expect(realResult).toEqual(mockedResult);
    });

    it('works correctly for phrase with only ommited chars', () => {
        const mockedResult = ' - - -';
        const realResult = encryptPhrase(' - - -');
        expect(realResult).toEqual(mockedResult);
    });

    it('works correctly for phrase with ommited chars', () => {
        const mockedResult = '____ _______-________';
        const realResult = encryptPhrase('name surname-surname2');
        expect(realResult).toEqual(mockedResult);
    });
    
});

describe('revealLetterInPhrase', () => {
    it('normal case - returns phrase with revealed letter', () => {
        const mockedResult = 'A___';
        const realResult = revealLetterInPhrase('ABCD', '____', 'A');
        expect(realResult).toEqual(mockedResult);
    });

    it('returns phrase with more than one letter to be revealed', () => {
        const mockedResult = 'A_A_C';
        const realResult = revealLetterInPhrase('ABABC', '____C', 'A');
        expect(realResult).toEqual(mockedResult);
    });

    it('returns phrase with ommited chars and revealed letters', () => {
        const mockedResult = 'A_ A_-C';
        const realResult = revealLetterInPhrase('AB AB-C', '__ __-C', 'A');
        expect(realResult).toEqual(mockedResult);
    });

    it('returns phrase with letter which is not part of phrase', () => {
        const mockedResult = '__ __-C';
        const realResult = revealLetterInPhrase('AB AB-C', '__ __-C', 'X');
        expect(realResult).toEqual(mockedResult);
    });
});

describe('getRandomPhrase', () => {
    it('returns object with random category and phrase from it', () => {
        const realResult = getRandomPhrase();
        const phrasesIncludesRealResult = phrases[realResult.category]
            .map(phrase => phrase.toUpperCase())
            .includes(realResult.phrase);
        expect(phrasesIncludesRealResult).toEqual(true);
    });
});
/* 
describe('createNewGame', () => {
    it('returns object gameState', () => {
        const getRandomPhraseMock = jest.spyOn(gameServerLogic, 'getRandomPhrase').mockImplementationOnce(() => {
            console.log("aoaada")
            return {
                category: 'actor',
                phrase: 'Tom Cruise',
            }
        });
        const realResult = createNewGame();
        const mockedResult = {0: {
            id: 0,
            category: 'actor',
            phrase: 'Tom Cruise',
            failsCounter: 0,
            encodedPhrase: '___ ______',
            endState: null,
        }}

        expect(getRandomPhraseMock).toHaveBeenCalled()
        expect(realResult).toEqual(mockedResult);
    });
}); */