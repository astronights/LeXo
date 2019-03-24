import React, {useContext, useEffect, useState} from 'react';
import classes from './DatePickerCust.scss';
import {UserContext} from "../../../../UserContext";

const DatePickerCust = ({value, onClick}) => {
    const [displayValue, setDisplayValue] = useState("1 Jan 2019");
    const {setDate, refetch} = useContext(UserContext);

    useEffect(() => {
        let newDate = new Date(value);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setDate(parseInt(newDate.getMonth()+1), newDate.getDate());
        setDisplayValue([newDate.getDate().toString(),months[newDate.getMonth()],newDate.getFullYear().toString()].join(" "));
        // refetch();
    }, [value]);

    const handleClick = () => {
        onClick();
        console.log(value)
    }
    return (
        <div className={classes.datePickerComp} onClick={handleClick}>
            {displayValue}
        </div>
    );
}

export default DatePickerCust;