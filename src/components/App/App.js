import React from 'react';
import styles from './App.css';
import Header from '../Header/Header';
import Phrase from '../Phrase/Phrase';
import Alphabet from '../Alphabet/Alphabet'

class App extends React.Component {
    state = {
        id: '',
        category: '',
        encodedPhrase: '',
        failsCounter: '',
    }
    fetchPhrase () {
        const url = "http://localhost:3000/phrases/new"
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
            console.log("data-phrase", data);
        });
    }

    clickedLetterFeedback = (data) => {
        console.log("dataFromLetter", data);
        this.setState({
            encodedPhrase: data.encodedPhrase,
            failsCounter: data.failsCounter,
        });
    }

    render() {
        return (
            <div className={styles.mainPage}>
                <Header />
                <Phrase category={this.state.category} phrase={this.state.encodedPhrase} />
                <Alphabet gameID={this.state.id} clickedLetter={this.clickedLetterFeedback}/>
            </div>
        )
    }
}

export default App;