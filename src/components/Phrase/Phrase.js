import React from 'react';
import { connect } from 'react-redux';
import styles from './Phrase.css';

class Phrase extends React.PureComponent {
    render() {
        const { category, phrase } = this.props
        const separatedPhraseWords = phrase.split(' ').map((word, index) => (<span key={index} className={styles.word}>{word}</span>));
        return(
            <div>
                <div className={styles.category}>Category: {category}</div>
                <div className={styles.phrase}>
                    {separatedPhraseWords}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ gameState })=> {
    return {
        category: gameState.category,
        phrase: gameState.encodedPhrase,
    }
}

export default connect(mapStateToProps)(Phrase);