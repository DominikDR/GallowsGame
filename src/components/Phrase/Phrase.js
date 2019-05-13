import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Phrase.css';

class PhrasePrimary extends React.PureComponent {
    render() {
        const { category, phrase } = this.props;
        const separatedPhraseWords = phrase.split(' ').map((word, index) => (
            <span key={`${word}${index}`} className={styles.word}>{word}</span>
        ));
        return (
            <div>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <div className={styles.category}>Category: {category}</div>
                <div className={styles.phrase}>{separatedPhraseWords}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ gameState }) => ({
    category: gameState.category,
    phrase: gameState.encodedPhrase,
});

PhrasePrimary.propTypes = {
    category: PropTypes.string.isRequired,
    phrase: PropTypes.string.isRequired,
};

export const Phrase = connect(mapStateToProps)(PhrasePrimary);
