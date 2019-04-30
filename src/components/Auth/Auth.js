import React, {useState, useEffect, useContext} from 'react';
import GoogleLogin from 'react-google-login';
import classes from './Auth.scss';
import {Redirect} from 'react-router-dom';
import Loading from '../UI/Loading/Loading';
// import CD from '../../assets/img/cd.gif';
import CD from '../../assets/img/logo.png';
import API from "../../utils/API";
import {UserContext} from "../../UserContext";
const Auth = () => {

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if(userData) setRedirect(true);
    }, []);

    const signUp = ({googleId:id, w3:{ig : dName}}) => {
        API.post('/signup/google', {
            id,
            displayName: dName
        })
            .then((response) => {
                setRedirect(true);
            })

    };

    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const {setPoints} = useContext(UserContext)


    const responseGoogle = async response => {
        console.log(response);
        const {data: {points}} = await API.post('/points', {user_id:response.El});
        let userData = {userId: response.El, token: response.accessToken, points}

        localStorage.setItem("userData", JSON.stringify(userData));


        setPoints(points);

        signUp(response);
    };

    return (
        <div className={classes.Auth}>

            {loading ? <Loading /> : null}
            {redirect ? <Redirect to={{pathname: '/mainmenu'}} /> : null}

            <div>
                <img src={CD} alt=""/>
                <h1>LeXo</h1>
            </div>

            <div onClick={() => {setLoading(true)}}>
                <GoogleLogin
                    clientId="932926853812-euoe6c5uapeb0mh5uu6n8gas6rb4ub5r.apps.googleusercontent.com"
                    buttonText="LOGIN"
                    scope="https://www.googleapis.com/auth/calendar"
                    autoLoad={false}
                    accessType="offline"
                    className={"googleButton"}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>


        </div>


    );
}

export default Auth;