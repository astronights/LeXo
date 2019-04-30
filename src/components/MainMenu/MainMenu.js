import React from 'react';
import classes from './MainMenu.scss';
import {Link} from 'react-router-dom';

const MainMenu = () => {
    return (
        <div className={classes.MainMenu}>
            <div className={classes.menuItem}>
                <Link to={'/game'}>
                    <div className={[classes.gameImg, classes.Img].join(" ")}></div>
                    <p>Game</p>
                </Link>
            </div>

            <div className={classes.hor}></div>

            <div className={classes.menuItem}>
                <Link to={'/translate'}>
                    <div className={[classes.translateImg, classes.Img].join(" ")}></div>
                    <p>Translate</p>
                </Link>
            </div>

            <div className={classes.hor}></div>

            <div className={classes.menuItem}>
                <Link to={'/add'}>
                    <div className={[classes.addImg, classes.Img].join(" ")}></div>
                    <p>Add word</p>
                </Link>
            </div>

            <div className={classes.hor}></div>

            <div className={classes.menuItem}>
                <Link to={'/leaderboard'}>
                    <div className={[classes.leadImg, classes.Img].join(" ")}></div>
                    <p>Leaderboard</p>
                </Link>
            </div>
        </div>
    )
}

export default MainMenu;