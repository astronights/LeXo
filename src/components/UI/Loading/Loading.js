import React from 'react';
import classes from './Loading.scss';

const Loading = () => {
    return (
        <div className={classes.Loading}>
            <div className={classes.spinner}>
                <div className={classes.cube1}></div>
                <div className={classes.cube2}></div>
            </div>
        </div>
    );
}

export default Loading;