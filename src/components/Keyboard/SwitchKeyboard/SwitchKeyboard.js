import React from 'react';
import styles from './SwitchKeyboard.css';
import { QWERTY, ALPHABETICALLY } from '../../../../consts';
import Alphabet from '../Alphabet';

// eslint-disable-next-line max-len
const allLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
const qwertyLettersPart1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const qwertyLettersPart2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const qwertyLettersPart3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const latinLetters = ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'];

class SwitchKeyboard extends React.PureComponent {
    state = {
        choosenKeyboard: localStorage.getItem(ALPHABETICALLY || QWERTY),
    };

    changeKeyboard = () => {
        const { choosenKeyboard } = this.state;
        this.setState({
            choosenKeyboard: choosenKeyboard === QWERTY ? ALPHABETICALLY : QWERTY,
        });
        localStorage.setItem(choosenKeyboard);
    }

    render() {
        const { choosenKeyboard } = this.state;
        return (
            <div className={styles.keyboardContainer}>
                <button
                    className={styles.changeKeyboardButton}
                    onClick={this.changeKeyboard}
                    type="button"
                >
                    {choosenKeyboard === QWERTY ? 'Change keyboard to Alphabetically' : 'Change keyboard to Qwerty'}
                </button>
                {choosenKeyboard === QWERTY ? (
                    <div className={styles.qwertyContainer}>
                        <Alphabet className={styles.qwertyPart1} availableLetters={qwertyLettersPart1} />
                        <Alphabet className={styles.qwertyPart2} availableLetters={qwertyLettersPart2} />
                        <Alphabet className={styles.qwertyPart3} availableLetters={qwertyLettersPart3} />
                        <Alphabet className={styles.latinLetters} availableLetters={latinLetters} />
                    </div>
                ) : (
                    <div>
                        <Alphabet availableLetters={allLetters} />
                    </div>
                )
                }
            </div>
        );
    }
}

export default SwitchKeyboard;
