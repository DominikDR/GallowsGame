import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { setGameState } from '../../actions/gameState';
import styles from './App.css';
import Header from '../Header/Header';
import Phrase from '../Phrase/Phrase';
import Alphabet from '../Alphabet/Alphabet';
import ShowGallows from '../ShowGallows/ShowGallows';
import GameOver from '../GameOver/GameOver';
import NewGame from '../NewGame/NewGame';

class App extends React.Component {
    async componentDidMount() {
        const { setGameState } = this.props;
        const data = await this.fetchPhrase();
        setGameState(data);
    }

    async fetchPhrase() {
        const url = '/phrases/new';
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            return response.json();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    render() {
        return (
            <div className={styles.mainPage}>
                <Header />
                <Phrase />
                <ShowGallows />
                <Alphabet />
                <GameOver>
                    <NewGame startNewGame={this.fetchPhrase} />
                </GameOver>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setGameState,
    },
    dispatch,
);

App.propTypes = {
    setGameState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
