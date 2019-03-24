import React from 'react';
import Page from "../Page/Page";
import Navbar from "../UI/Navbar/Navbar";
import AppRouter from "../../AppRouter";
import CustChatbot from "../Chatbot/Chatbot";
import {Route} from 'react-router-dom';

const Layer = () => {
    return (
            <Page>
                <AppRouter/>
            </Page>
    );
}

export default Layer;
