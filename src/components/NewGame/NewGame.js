import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameState } from '../../actions/gameState';
import styles from './NewGame.css';
import { fetchPhrase } from '../App/App';

class NewGame extends React.Component {
    handleFetchPhrase = async () => {
        const { setGameState } = this.props;
        const data = await fetchPhrase();
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

export default connect(null, mapDispatchToProps)(NewGame);
