import React from 'react';
import styles from './Letter.css';

const checkLetter = (letter, id) => {
    const url = `http://localhost:3000/phrases/check?id=${id}&letter=${letter}`
    return fetch(url, {
        method: 'post',
    })
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    })
    .then(data => {
        console.log("dataAfterLetterClicked", data)
    });
}

const Letter = ({letter, gameID}) => {
    console.log("gameID",gameID)
    return(
        <div className={styles.letter} onClick={checkLetter.bind(null, letter, gameID)}>
            {letter}
        </div>
    )
}

export default Letter;