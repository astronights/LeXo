import React, {useState, useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import classes from './Auth.scss';
import {Redirect} from 'react-router-dom';
import Loading from '../UI/Loading/Loading';

const Auth = () => {

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if(userData) setRedirect(true);
    }, []);

    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const responseGoogle = response => {
        console.log(response);
        setLoading(true);
        let userData = {userId: response.El, token: response.accessToken }
        localStorage.setItem("userData", JSON.stringify(userData));
        setRedirect(true);
        // this.signUp(response, "google");
    };

    return (
        <div className={classes.Auth}>

            {loading ? <Loading /> : null}

            {redirect ? <Redirect to={{pathname: '/home'}} /> : null}
            {/* PLEASECHANGE redirect to /chatbot*/}

            <GoogleLogin
                clientId="932926853812-q72rn1t0a3fo3lrufnmqthshsv3e56vu.apps.googleusercontent.com"
                buttonText="LOGIN"
                scope="https://www.googleapis.com/auth/calendar"
                // accessType="offline"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>


    );
}

export default Auth;