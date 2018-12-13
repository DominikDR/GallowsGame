import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './NewGame.css';

const NewGame = ({ startNewGame }) => {
    return (
        <button className={styles.newGame} onClick={this.props.startNewGame}>New Game</button>
    )
};



export default NewGame;
