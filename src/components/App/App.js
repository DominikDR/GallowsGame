import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setGameState } from '../../actions/gameState';
import styles from './App.css';
import { Header } from '../Header';
import { Phrase } from '../Phrase';
import { SwitchKeyboard } from '../Keyboard/SwitchKeyboard';
import { ShowGallows } from '../ShowGallows';
import { GameOver } from '../GameOver';

export const fetchPhrase = async () => {
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
};

class App extends React.Component {
    async componentDidMount() {
        const { setGameState } = this.props;
        const data = await fetchPhrase();
        setGameState(data);
    }

    render() {
        return (
            <div className={styles.mainPage}>
                <Header />
                <Phrase />
                <ShowGallows />
                <SwitchKeyboard />
                <GameOver />
            </div>
        );
    }
}

const mapDispatchToProps = { setGameState };

App.propTypes = {
    setGameState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
