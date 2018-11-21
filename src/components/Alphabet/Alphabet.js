import React from 'react';
import { connect } from 'react-redux';
import { setGameState } from '../../actions/gameState'
import { bindActionCreators } from 'redux'
import styles from './Alphabet.css';
import Letter from './Letter/Letter';

const availableLetters = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','Q','R','S','Ś','T','U','V','W','X','Y','Z','Ź','Ż'];

class Alphabet extends React.Component {
    handleLetterClicked = (data) => {
        this.props.setGameState({
            encodedPhrase: data.encodedPhrase,
            failsCounter: data.failsCounter,
            endState: data.endState,
        });
    }

    renderAlphabet = () => {
        const { gameID, failsCounter } = this.props;
        const letters = availableLetters.map(letter => (
            <Letter 
                key={letter}
                letter={letter}
                gameID={gameID}
                failsCounter={failsCounter}
                onLetterClick={this.handleLetterClicked}
            />
        ));
        return letters;
    }
    
    render() {
        return (
            <div className={styles.alphabet} >
                {this.renderAlphabet()}
            </div>
        )
    }
}

const mapStateToProps = ({ gameState })=> {
	return {
        gameID: gameState.gameID,
        failsCounter: gameState.failsCounter,
        encodedPhrase: gameState.encodedPhrase,
        endState: gameState.endState,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setGameState,
    },
    dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Alphabet);