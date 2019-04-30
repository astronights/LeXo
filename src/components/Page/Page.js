import React, {useEffect, useState} from "react";
import {UserProvider} from "../../UserContext";
import API from '../../utils/API';

const Page = ({children}) => {

    const [data, setData] = useState([]);
    const [inputLang, setInputLang] = useState('Khmu');
    const [points, setPoints] = useState(0);
    const [user_id, setUser_Id] = useState("");
    const incrementPoints = (x) => {
        localStorage.setItem('userData', JSON.stringify({...JSON.parse(localStorage.getItem('userData')), points: points+x}))
        setPoints(points+x);
    }

    async function fetchData(){
        // console.log('Fetching data from api :)');
        const {userId, points:p} = JSON.parse(localStorage.getItem('userData'));
        setPoints(p);
    }

    useEffect( () => {
        fetchData();
    }, []);

    return (
        <UserProvider
            value={{
                points,
                inputLang,
                setInputLang,
                setPoints,
                incrementPoints
            }}
        >
            <div style={{height:'100vh'}} className="page">{children}</div>
        </UserProvider>
    );
};
export default Page;
