import React from 'react';
import styles from './Phrase.css';

class Phrase extends React.PureComponent {
    render() {
        const { category, phrase } = this.props
        console.log("Phrase", phrase);
        return(
            <div>
                <div className={styles.category}>Category: {category}</div>
                <div className={styles.phrase}>{phrase}</div>
            </div>
        )
    }
}

export default Phrase;