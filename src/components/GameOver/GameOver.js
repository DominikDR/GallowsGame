import React from 'react';
import styles from './GameOver.css';
import classnames from 'classnames';

const GameOver = ({endState}) => {
    
    return(
        <div className={styles.resultField} >
            { endState === 1 &&
                <div className={styles.win}>
                    <div>You guessed!</div>
                    <div>Congratulations</div>
                </div>
            }
            { endState === 0 &&
                <div className={classnames(styles.win, styles.loose)}>
                    <div>You lost</div>
                    <div>Try again</div>
                </div>
            }
        </div>
    )
}

export default GameOver;