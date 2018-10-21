import React from 'react';
import styles from './ShowGallows.css';

const ShowGallows = ({failsCounter}) => {
    return(
        <div className={styles.counter} >
            Failed attempts: {failsCounter}
        </div>
    )
}

export default ShowGallows;