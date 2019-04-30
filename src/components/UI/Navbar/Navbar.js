import React, {useContext, useEffect, useState} from 'react';
import classes from './Navbar.scss';
import {UserContext} from "../../../UserContext";
import GameImg from '../../../assets/img/game.svg';
import TranslateImg from '../../../assets/img/translate1.svg';
import AddImg from '../../../assets/img/add.svg';
import LeaderboardImg from '../../../assets/img/leaderboard.svg';
import CoinsImg from '../../../assets/img/coins.svg';
import {Link} from 'react-router-dom';

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const pageName = location.pathname.substr(1);

    const openMenu = () => {

        if (open) {
            setTimeout(() => {
                setOpen(!open)
            }, 90)
            setShowIcons(!showIcons)
        } else {
            setOpen(!open)
            setTimeout(() => {
                setShowIcons(!showIcons)
            }, 90)
        }


    }
    const {points} = useContext(UserContext);
    return (
        <header className={classes.Navbar}>

            <div className={classes.points}>
                <Link to="/mainmenu">
                    <img src={CoinsImg} alt=""/>
                </Link>
                <p>{points}</p>

            </div>

            <div className={classes.menu} onClick={openMenu}>
                <div className={classes.menuIcon}><i className="material-icons">{showIcons ? "close" : "home"}</i></div>

                <div
                    className={[classes.extendedMenu, open ? classes.open : null, showIcons ? classes.showIcons : null].join(" ")}>


                    {
                        pageName !== "game" &&
                        < div className={classes.menuItem}>
                        <Link to="/game">
                        <img src={GameImg} alt=""/>
                        </Link>
                        </div>
                    }

                    {
                        pageName !== "translate" &&
                        <div className={classes.menuItem}>
                            <Link to="/translate">
                                <img src={TranslateImg} alt=""/>
                            </Link>
                        </div>
                    }

                    {
                        pageName !== "leaderboard" &&
                        <div className={classes.menuItem}>
                            <Link to="/leaderboard">
                                <img src={LeaderboardImg} alt=""/>
                            </Link>
                        </div>
                    }

                    {
                        pageName !== "add" &&
                        <div className={classes.menuItem}>
                            <Link to="/add">
                                <img src={AddImg} alt=""/>
                            </Link>
                        </div>
                    }
                </div>
            </div>

        </header>
    );
}


export default Navbar;
