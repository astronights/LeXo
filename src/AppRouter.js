import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import {ProtectedRoute} from "./components/UI/Navbar/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import MainMenu from "./components/MainMenu/MainMenu";
import Game from "./components/Game/Game";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import Navbar from "./components/UI/Navbar/Navbar";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Translate from "./components/Translate/Translate";

const AppRouter = () => (
    <React.Fragment>
        <Navbar/>
        <Switch>
            <Route path='/auth' component={Auth}/>
            <ProtectedRoute path='/mainmenu' component={MainMenu}/>
            <ProtectedRoute path='/home' component={Home}/>
            <ProtectedRoute path='/leaderboard' component={Leaderboard}/>
            <ProtectedRoute path='/game' component={Game}/>
            <ProtectedRoute path='/add' component={AddQuestion}/>
            <ProtectedRoute path='/translate' component={Translate}/>
            <ProtectedRoute path='/' component={Auth}/>
        </Switch>
    </React.Fragment>
);

export default AppRouter;
