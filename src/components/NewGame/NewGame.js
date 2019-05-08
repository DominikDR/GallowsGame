import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameState } from '../../actions/gameState';
import { fetchPhrase } from '../App/App';
import styles from './NewGame.css';

class NewGamePrimary extends React.Component {
    handleFetchPhrase = async () => {
        const { setGameState } = this.props;
        const data = await fetchPhrase();
        data.letterStatus = {};
        setGameState(data);
    };

    render() {
        return (
            <button className={styles.newGame} onClick={this.handleFetchPhrase} type="button">New Game</button>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setGameState,
    },
    dispatch,
);

export const NewGame = connect(null, mapDispatchToProps)(NewGamePrimary);
