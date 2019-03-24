import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const checkAuth = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    return userData;
}

export const ProtectedRoute = ({component: Component, rest }) => {
    return (
        <Route {...rest} render={ props => {
            return (checkAuth())    ?  <Component {...props}/>
                                    : <Redirect to={{pathname: "/auth"}} />;

            }
        }/>
    );
}