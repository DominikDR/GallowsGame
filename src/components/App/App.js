import React from 'react';
import styles from './App.css';

class App extends React.PureComponent {
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