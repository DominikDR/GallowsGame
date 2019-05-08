import React from 'react';
import styles from './SwitchKeyboard.css';
import { QWERTY, ALPHABETICALLY } from '../../../../consts';
import { Alphabet } from '../Alphabet';

// eslint-disable-next-line max-len
const allLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
const qwertyLettersPart1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const qwertyLettersPart2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const qwertyLettersPart3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const latinLetters = ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'];

class SwitchKeyboard extends React.PureComponent {
    state = {
        choosenKeyboard: ALPHABETICALLY,
    };

    componentDidMount() {
		console.log("> componentDidMount -> ", localStorage.getItem('choosenKeyboard'));
        this.setState({
            choosenKeyboard: localStorage.getItem('choosenKeyboard'),
        });
    }

    changeKeyboard = () => {
        const { choosenKeyboard } = this.state;
        console.log("changeKeyboard functino ->", choosenKeyboard)
        localStorage.setItem('choosenKeyboard', choosenKeyboard);
        this.setState({
            choosenKeyboard: choosenKeyboard === QWERTY ? ALPHABETICALLY : QWERTY,
        });
    }

    render() {
        const { choosenKeyboard } = this.state;
		console.log("render ->", choosenKeyboard)
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

export { SwitchKeyboard };
