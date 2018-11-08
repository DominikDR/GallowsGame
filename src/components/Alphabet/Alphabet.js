import React from 'react';
import styles from './Alphabet.css';
import Letter from './Letter/Letter';

const availableLetters = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','Q','R','S','Ś','T','U','V','W','X','Y','Z','Ź','Ż'];
const Alphabet = ({gameID, onLetterClick, failsCounter}) => {
    const letters = availableLetters.map(letter => (
        <Letter 
            key={letter}
            letter={letter}
            gameID={gameID}
            failsCounter={failsCounter}
            onLetterClick={onLetterClick}
        />
    ));
    return(
        <div className={styles.alphabet}>
            {letters}
        </div>
    )
}

export default Alphabet;