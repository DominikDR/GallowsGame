import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { setGameState } from '../../actions/gameState';
import styles from './Alphabet.css';
import Letter from './Letter/Letter';
import { LETTER_STATUS_CORRECT, LETTER_STATUS_INCORRECT } from '../../../consts';

// eslint-disable-next-line max-len
const availableLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];

class Alphabet extends React.Component {
    state = {
        letterStatus: {},
    };

    componentDidUpdate(prevProps) {
        if (this.props.gameID !== prevProps.gameID) { // eslint-disable-line react/destructuring-assignment
            this.setState({ // eslint-disable-line react/no-did-update-set-state
                letterStatus: {},
            });
        }
    }

    handleLetterClicked = (data, clickedLetter) => {
        const { setGameState, failsCounter } = this.props;
        const { letterStatus } = this.state;
        this.setState({
            letterStatus: {
                ...letterStatus,
                [clickedLetter]: data.failsCounter === failsCounter ? LETTER_STATUS_CORRECT : LETTER_STATUS_INCORRECT,
            },
        });
        setGameState({
            encodedPhrase: data.encodedPhrase,
            failsCounter: data.failsCounter,
            endState: data.endState,
        });
    }

    renderAlphabet = () => {
        const { gameID, failsCounter } = this.props;
        const { letterStatus } = this.state;
        const letters = availableLetters.map(letter => (
            <Letter
                key={letter}
                letter={letter}
                gameID={gameID}
                failsCounter={failsCounter}
                onLetterClick={this.handleLetterClicked}
                letterStatus={letterStatus[letter]}
            />
        ));
        return letters;
    }

    render() {
        return (
            <div className={styles.alphabet}>
                {this.renderAlphabet()}
            </div>
        );
    }
}

const mapStateToProps = ({ gameState }) => ({
    gameID: gameState.gameID,
    failsCounter: gameState.failsCounter,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setGameState,
    },
    dispatch,
);

Alphabet.propTypes = {
    gameID: PropTypes.number.isRequired,
    failsCounter: PropTypes.number.isRequired,
    setGameState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alphabet);
