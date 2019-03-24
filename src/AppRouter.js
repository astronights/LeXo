import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import {ProtectedRoute} from "./components/UI/Navbar/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import CustChatbot from "./components/Chatbot/Chatbot";

const AppRouter =  () => (
    <Switch>
        <Route path='/auth' component={Auth}/>
        <ProtectedRoute path='/chatbot' component={CustChatbot} />
        <ProtectedRoute path='/home' component={Home} />
        <ProtectedRoute  path='/' component={Auth}/>
        {/*<ProtectedRoute  path='/chatbot' component={Home}/>*/}
    </Switch>
);

export default AppRouter;
