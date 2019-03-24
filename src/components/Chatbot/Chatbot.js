import React, {useContext, useState} from "react";
import ChatBot from "react-simple-chatbot";
import  classes from "./Chatbot.scss";
import {steps} from "./steps.js"
import {UserContext} from "../../UserContext";
import {Redirect} from 'react-router-dom';

const CustChatbot = () => {
    const [redirect, setRedirect] = useState(false);
    const {refetch, setChatbotDetails} = useContext(UserContext);
    const handleEnd = ({ steps, values }) => {
        console.log(values);
        setChatbotDetails(values.slice(1));

        // refetch();
        setRedirect(true);

    }

        return (
            <div className={classes.chatbot}>
                {redirect ? <Redirect to="/home" />: null}
                <ChatBot
                    handleEnd = {handleEnd}
                    steps={steps} />
            </div >
        );
    }

export default CustChatbot;