import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.scss';
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePickerCust from "./DatePickerCust/DatePickerCust";
import html2canvas from "html2canvas";

const Navbar = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <header className={classes.Header}>
            <div onClick={() => {
                html2canvas(document.querySelector("#root")).then(canvas => {
                    // navigator.share({image: canvas.toDataURL("image/png")});
                    document.body.appendChild(canvas)
                });
            }}
            className={classes.shareIcon}>
                <i className="material-icons">
                    share
                </i>
            </div>
            <div className={classes.calendar}>
                <DatePicker
                    customInput={<DatePickerCust/>}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
            </div>
            <div className={classes.blank}>

            </div>
        </header>
    );
}


export default Navbar;
