import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setGameState } from '../../../actions/gameState';
import styles from './Alphabet.css';
import { Letter } from '../Letter';
import { LETTER_STATUS_CORRECT, LETTER_STATUS_INCORRECT } from '../../../../consts';

class Alphabet extends React.Component {
    handleLetterClicked = (data, clickedLetter) => {
        const { setGameState, failsCounter, letterStatus } = this.props;
        setGameState({
            encodedPhrase: data.encodedPhrase,
            failsCounter: data.failsCounter,
            endState: data.endState,
            letterStatus: {
                ...letterStatus,
                [clickedLetter]: data.failsCounter === failsCounter ? LETTER_STATUS_CORRECT : LETTER_STATUS_INCORRECT,
            },
        });
    }

    renderAlphabet = () => {
        const { gameID, availableLetters, letterStatus } = this.props;
        const letters = availableLetters.map(letter => (
            <Letter
                key={letter}
                letter={letter}
                gameID={gameID}
                onLetterClick={this.handleLetterClicked}
                letterStatus={letterStatus[letter]}
            />
        ));
        return letters;
    }

    render() {
        const { className } = this.props;
        const alphabetStyles = classnames(styles.alphabet, className);
        return (
            <div className={alphabetStyles}>
                {this.renderAlphabet()}
            </div>
        );
    }
}

const mapStateToProps = ({ gameState }) => ({
    gameID: gameState.gameID,
    failsCounter: gameState.failsCounter,
    letterStatus: gameState.letterStatus,
});

const mapDispatchToProps = { setGameState };

Alphabet.propTypes = {
    gameID: PropTypes.number.isRequired,
    failsCounter: PropTypes.number.isRequired,
    setGameState: PropTypes.func.isRequired,
    letterStatus: PropTypes.shape({ letter: PropTypes.string }),
    availableLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alphabet);
