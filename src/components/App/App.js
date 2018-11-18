import React from 'react';
import { connect } from 'react-redux';
import { setGameState } from '../../actions/gameState'
import { bindActionCreators } from 'redux'
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
            const { id, category, encodedPhrase, failsCounter } = data;
            this.props.setGameState(data);
        });
    }

    handleLetterClicked = (data) => {
        this.props.setGameState({
            encodedPhrase: data.encodedPhrase,
            failsCounter: data.failsCounter,
            endState: data.endState,
        });
    }

    render() {
        const { failsCounter, category, encodedPhrase, id, endState } = this.props;

        return (
            <div className={styles.mainPage}>
                <Header />
                <Phrase />
                <ShowGallows failsCounter={failsCounter} />
                <Alphabet gameID={id} onLetterClick={this.handleLetterClicked} failsCounter={failsCounter}/>
                { endState && <GameOver endState={endState} />}
            </div>
        )
    }
}

const mapStateToProps = ({ gameState })=> {
	return {
		id: gameState.id,
        category: gameState.category,
        encodedPhrase: gameState.encodedPhrase,
        failsCounter: gameState.failsCounter,
        endState: gameState.endState,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setGameState,
    },
    dispatch,
)

/* const mapDispatchToProps = (dispatch) => ({
	setGameState: (state) => dispatch(setGameState(state))
}) */

export default connect(mapStateToProps, mapDispatchToProps)(App);