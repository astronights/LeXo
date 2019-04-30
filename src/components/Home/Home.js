import React, {useContext, useState} from 'react';
import classes from './Home.scss';
import {UserContext} from "../../UserContext";
import Modal from '../Modal/Modal';
import Navbar from "../UI/Navbar/Navbar";
import Loading from "../UI/Loading/Loading";

const Home = () => {
    return (

        <div className={classes.Home}>
            <Navbar />

            <div>
                Hi
            </div>
        </div>
    );
}

export default Home;

