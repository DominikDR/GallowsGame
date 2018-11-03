import React from 'react';
import styles from './Letter.css';
import classnames from 'classnames';


class Letter extends React.PureComponent {
    state = {
        isLetterCorrect: null,
        usedLetter: false,
    };

    checkLetter = (letter, id) => {
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
            if (data.failsCounter === this.props.failsCounter) {
                this.setState({
                    isLetterCorrect: true,
                })
            } else {
                this.setState({
                    isLetterCorrect: false,
                })
            }
            this.props.onLetterClick(data);
        });
    }

    onClickMethod = () => {
        if (this.state.usedLetter) return;
        this.setState ({
            usedLetter: true,
        })
        const { letter, gameID } = this.props;
        this.checkLetter(letter, gameID);
    }

    render() {
        const { usedLetter, isLetterCorrect } = this.state;

        const letterStyle = classnames(styles.letter, {
            [styles.letterHover]: !usedLetter,
        }, usedLetter && isLetterCorrect !== null && {
            [styles.correctLetter]: isLetterCorrect,
            [styles.wrongLetter]: !isLetterCorrect,
        });
        return(
            <div className={letterStyle} onClick={this.onClickMethod}>
                {this.props.letter}
            </div>
        )
    }
}

export default Letter;