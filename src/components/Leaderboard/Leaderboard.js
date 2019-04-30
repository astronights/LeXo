import React, {useEffect, useState} from 'react';
import classes from './Leaderboard.scss';
import API from "../../utils/API";
import Loading from "../UI/Loading/Loading";
import One from '../../assets/img/wreath.svg'
import Two from '../../assets/img/wreath2.svg'
import Three from '../../assets/img/wreath3.svg'

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const {userId: user_id} = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        API.get('/leaderboard').then(({data}) => setUsers(data));
        // setUsers(users);
    }, []);
    const getImg = (index) => {
        if(index == 0) return One;
        if(index == 1) return Two;
        if(index == 2) return Three;
    }
    return (
        <div className={classes.Leaderboard}>
            <h2>Leaderboard</h2>
            {!users[0] && <Loading/>}

            {users && users.map((u, index) => {
                // console.log(u)
                return (
                    <div key={u.user_id} className={[classes.user, u.user_id==user_id ? classes.currentUser:null].join(" ")}>
                        <div className={classes.holder}>
                        {
                            (index<3)
                                ? <img src={getImg(index)} alt=""/>
                                : <div className={classes.blank}></div>
                        }
                        <p>{u.display_name}</p>
                        </div>
                        <p>{u.points}</p>
                    </div>
                );


            })}
        </div>
    );
}

export default Leaderboard;