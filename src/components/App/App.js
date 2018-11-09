import React from 'react';
import styles from './App.css';
import Header from '../Header/Header';
import Phrase from '../Phrase/Phrase';
import Alphabet from '../Alphabet/Alphabet';
import ShowGallows from '../ShowGallows/ShowGallows';
import GameOver from '../GameOver/GameOver';

class App extends React.Component {
    state = {
        id: '',
        category: '',
        encodedPhrase: '',
        failsCounter: 0,
        endState: null,
    }

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
            this.setState({
                id,
                category,
                encodedPhrase,
                failsCounter,
            })
        });
    }

    handleLetterClicked = (data) => {
        this.setState({
            encodedPhrase: data.encodedPhrase,
            failsCounter: data.failsCounter,
            endState: data.endState,
        });
    }

    render() {
        const { failsCounter, category, encodedPhrase, id, handleLetterClicked, endState } = this.state;

        return (
            <div className={styles.mainPage}>
                <Header />
                <Phrase category={category} phrase={encodedPhrase} />
                <ShowGallows failsCounter={failsCounter} />
                <Alphabet gameID={id} onLetterClick={this.handleLetterClicked} failsCounter={failsCounter}/>
                { endState && <GameOver endState={endState} />}
            </div>
        )
    }
}

export default App;