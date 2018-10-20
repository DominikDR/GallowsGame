import React from 'react';
import styles from './Alphabet.css';
import Letter from './Letter/Letter';

const letters = ["A","Ą","B", "C", "Ć","D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N","Ń", "O","Ó", "P","Q","R", "S","Ś", "T", "U", "V","W", "X", "Y", "Z", "Ź", "Ż"];
const Alphabet = ({gameID}) => {
    const letter = letters.map(letter => <Letter letter={letter} key={letter} gameID={gameID} />)
    return(
        <div className={styles.alphabet}>
            {letter}
        </div>
    )
}

export default Alphabet;