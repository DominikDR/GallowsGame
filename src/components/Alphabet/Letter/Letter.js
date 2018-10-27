import React from 'react';
import styles from './Letter.css';

const checkLetter = (letter, id, onLetterClick) => {
    const url = `/phrases/check`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
            id,
            letter,
        })
    })
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    })
    .then(data => {
        onLetterClick(data);
    });
}

const Letter = React.memo(({letter, gameID, onLetterClick}) => {
    console.log("gameID",gameID)
    return(
        <div className={styles.letter} onClick={checkLetter.bind(null, letter, gameID, onLetterClick)}>
            {letter}
        </div>
    )
});

export default Letter;