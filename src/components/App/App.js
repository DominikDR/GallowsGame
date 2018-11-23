import React from 'react';
import { connect } from 'react-redux';
import { setGameState } from '../../actions/gameState';
import { bindActionCreators } from 'redux';
import styles from './App.css';
import Header from '../Header/Header';
import Phrase from '../Phrase/Phrase';
import Alphabet from '../Alphabet/Alphabet';
import ShowGallows from '../ShowGallows/ShowGallows';
import GameOver from '../GameOver/GameOver';

class App extends React.Component {

    fetchPhrase () {
        const url = "/phrases/new"
        return fetch(url, {
            method: 'get',
        })
        .then(response => response.json())
        .catch(error => {
            console.error(error);
        });
    }

    componentDidMount() {
        this.fetchPhrase().then(data => {
            this.props.setGameState(data);
        });
    }

    render() {
        return (
            <div className={styles.mainPage}>
                <Header />
                <Phrase />
                <ShowGallows />
                <Alphabet />
                <GameOver />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setGameState,
    },
    dispatch,
)

export default connect(null, mapDispatchToProps)(App);