import React, {useState, useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import classes from './Auth.scss';
import {Redirect} from 'react-router-dom';
import Loading from '../UI/Loading/Loading';
import CD from '../../assets/img/cd.gif';

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


            {redirect ? <Redirect to={{pathname: '/chatbot'}} /> : null}
            {/* PLEASECHANGE redirect to /chatbot*/}

            <div>
                <img src={CD} alt=""/>
                <h1>Carpe Diem</h1>
            </div>



            <GoogleLogin
                clientId="932926853812-euoe6c5uapeb0mh5uu6n8gas6rb4ub5r.apps.googleusercontent.com"
                buttonText="LOGIN"
                scope="https://www.googleapis.com/auth/calendar"
                autoLoad={false}
                className={"googleButton"}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>


    );
}

export default Auth;