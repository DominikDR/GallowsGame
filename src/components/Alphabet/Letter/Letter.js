import React from 'react';
import styles from './Letter.css';
import classnames from 'classnames';
import { LETTER_STATUS_CORRECT, LETTER_STATUS_INCORRECT } from '../../../../consts';

class Letter extends React.PureComponent {
    state = {
        letterStatus: '',
    };

    checkLetter = () => {
        const { letter, gameID } = this.props;
        const url = `/phrases/check`;
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                gameID,
                letter,
            })
        })
        .then(response => response.json())
        .catch(error => {
            console.error(error);
        })
        .then(data => {
            this.setState({
                letterStatus: data.failsCounter === this.props.failsCounter ? LETTER_STATUS_CORRECT : LETTER_STATUS_INCORRECT,
            })
            this.props.onLetterClick(data);
        });
    }
    
    render() {
        const { letterStatus } = this.state;
        
        const letterStyle = classnames(styles.letter, {
            [styles.correctLetter]: letterStatus === LETTER_STATUS_CORRECT,
            [styles.wrongLetter]: letterStatus === LETTER_STATUS_INCORRECT,
        });
        return(
            <div className={letterStyle} onClick={this.checkLetter}>
                {this.props.letter}
            </div>
        )
    }
}

export default Letter;