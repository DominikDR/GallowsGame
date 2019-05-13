import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ShowGallows.css';
import gallowsImg0 from '../../../assets/gallowsImg0.jpg';
import gallowsImg1 from '../../../assets/gallowsImg1.jpg';
import gallowsImg2 from '../../../assets/gallowsImg2.jpg';
import gallowsImg3 from '../../../assets/gallowsImg3.jpg';
import gallowsImg4 from '../../../assets/gallowsImg4.jpg';
import gallowsImg5 from '../../../assets/gallowsImg5.jpg';
import gallowsImg6 from '../../../assets/gallowsImg6.jpg';

const gallowsImages = [gallowsImg0, gallowsImg1, gallowsImg2, gallowsImg3, gallowsImg4, gallowsImg5, gallowsImg6];

const ShowGallowsPrimary = ({ failsCounter }) => (
    <div className={styles.container}>
        <img className={styles.gallowsImage} src={gallowsImages[failsCounter]} alt="gallows" />
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        { failsCounter > 0 && <span className={styles.counter}>Failed attempts: {failsCounter}</span> }
    </div>
);

const mapStateToProps = ({ gameState }) => ({
    failsCounter: gameState.failsCounter,
});

ShowGallowsPrimary.propTypes = {
    failsCounter: PropTypes.number.isRequired,
};

export const ShowGallows = connect(mapStateToProps)(ShowGallowsPrimary);
