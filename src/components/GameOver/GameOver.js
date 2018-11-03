import React from 'react';
import styles from './GameOver.css';
import classnames from 'classnames';
import { GAME_STATE_FAILED, GAME_STATE_WON } from '../../../consts';

const GameOver = ({endState}) => {
    
    return(
        <div>
            <div className={styles.resultField}>
                { endState === GAME_STATE_WON &&
                    <div className={classnames(styles.gameOverFrame, styles.win)}>
                        <div>You guessed!</div>
                        <div>Congratulations</div>
                    </div>
                }
                { endState === GAME_STATE_FAILED &&
                    <div className={classnames(styles.gameOverFrame, styles.loose)}>
                        <div>You lost</div>
                        <div>Try again</div>
                    </div>
                }
            </div>
            <div className={styles.overlay}>
            </div>
        </div>
    )
}

export default GameOver;