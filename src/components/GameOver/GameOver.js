import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './GameOver.css';
import NewGame from '../NewGame/NewGame';
import { GAME_STATE_FAILED, GAME_STATE_WON } from '../../../consts';

const GameOver = ({ endState }) => {
    if (!endState) {
        return null;
    }
    return (
        <div>
            <div className={styles.resultField}>
                {endState === GAME_STATE_WON && (
                    <div className={classnames(styles.gameOverFrame, styles.win)}>
                        <div>You guessed!</div>
                        <div>Congratulations</div>
                    </div>
                )}
                {endState === GAME_STATE_FAILED && (
                    <div className={classnames(styles.gameOverFrame, styles.loose)}>
                        <div>You lost</div>
                        <div>Try again</div>
                    </div>
                )}
            </div>
            <NewGame />
            <div className={styles.overlay} />
        </div>
    );
};

const mapStateToProps = ({ gameState }) => ({
    endState: gameState.endState,
});

GameOver.propTypes = {
    endState: PropTypes.string,
};

export default connect(mapStateToProps)(GameOver);
