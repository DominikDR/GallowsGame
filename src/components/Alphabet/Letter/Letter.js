import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Letter.css';
import { LETTER_STATUS_CORRECT, LETTER_STATUS_INCORRECT } from '../../../../consts';

class Letter extends React.PureComponent {
    checkLetter = async () => {
        const { letter, gameID, onLetterClick } = this.props;
        const url = '/phrases/check';
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
                    gameID,
                    letter,
                }),
            });
            const data = await response.json();
            return onLetterClick(data, letter);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    render() {
        const { letter, letterStatus } = this.props;
        const letterStyle = classnames(styles.letter, {
            [styles.correctLetter]: letterStatus === LETTER_STATUS_CORRECT,
            [styles.wrongLetter]: letterStatus === LETTER_STATUS_INCORRECT,
        });
        return (
            <div className={letterStyle} onClick={this.checkLetter} tabIndex="0" role="button">
                {letter}
            </div>
        );
    }
}

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    gameID: PropTypes.number.isRequired,
    onLetterClick: PropTypes.func.isRequired,
    letterStatus: PropTypes.oneOfType([
        PropTypes.string,
    ]),
};

export default Letter;
