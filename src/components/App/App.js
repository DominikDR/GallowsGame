import React from 'react';
import styles from './App.css';

class App extends React.PureComponent {
    state = {
        
    }
    fetchPhrase () {
        const url = "http://localhost:3000/phrases/new"
        return fetch(url, {
            method: 'get',
        })
        .then(response => response.json())
        .catch(error => {
            console.error(error)
        });
    }
    componentDidMount() {
        this.fetchPhrase().then(data => {
            console.log("data-phrase", data);
        });
    }
    render() {
        return (
            <div className={styles.mainPage}>
                <header className={styles.welcome}>
                    <h1>Welcome to my weird site!</h1>
                </header>
            </div>
        )
    }
}

export default App;