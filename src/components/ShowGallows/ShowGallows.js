import React from 'react';
import styles from './ShowGallows.css';
import gallowsImg0 from '../../../assets/0.jpg';
import gallowsImg1 from '../../../assets/1.jpg';
import gallowsImg2 from '../../../assets/2.jpg';
import gallowsImg3 from '../../../assets/3.jpg';
import gallowsImg4 from '../../../assets/4.jpg';
import gallowsImg5 from '../../../assets/5.jpg';
import gallowsImg6 from '../../../assets/6.jpg';

const gallowsImages = [gallowsImg0, gallowsImg1, gallowsImg2, gallowsImg3, gallowsImg4, gallowsImg5, gallowsImg6];

const ShowGallows = ({failsCounter}) => {
    return(
        <div className={styles.container}>
            <img className={styles.gallowsImage} src={gallowsImages[failsCounter]} alt="gallows image"></img>
            { failsCounter > 0 && <span className={styles.counter}>Failed attempts: {failsCounter}</span> }
        </div>
    )
}

export default ShowGallows;