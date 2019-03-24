import React, {useContext, useState} from 'react';
import classes from './Home.scss';
import {UserContext} from "../../UserContext";
import Modal from '../Modal/Modal';
import API from "../../utils/API";
import Navbar from "../UI/Navbar/Navbar";
import html2canvas from 'html2canvas';
import Loading from "../UI/Loading/Loading";

const Home = () => {
    const getKey = ({lat:lat1, lng:lng1},{lat:lat2, lng:lng2}) => lat1.toString() + lng1.toString() + lat2.toString() + lng2.toString();
    const [modalElem, setModalElem] = useState(null);
    const {data:routesData, media} = useContext(UserContext);
    const individualRoutesArray = () => {
        let obj = {};
        routesData.forEach(({details, legs}, index) => {
            let key = getKey(legs.start_location, legs.end_location);
            obj[key] = (
                <div className={classes.routeModalData}>
                    {
                        legs.steps.map((s, sIndex) => {
                            return (
                                <div className={classes.step}>
                                    <p><i
                                        className="material-icons">{s.travel_mode == "WALKING" ? "directions_walk" : "directions_transit"}</i>
                                    </p>
                                    <p>{(sIndex == legs.steps.length - 1) ? `Walk to ${details.destination}` : s.html_instructions}</p>
                                    <p>{s.duration.text}</p>
                                </div>
                            )

                        })
                    }
                </div>
            );
                // return obj;
        }) //end loop

        return obj;
    }


    const getIndividualRoute = (key) => {
        return individualRoutesArray()[key];
    }

    const getTypeOfPlace = (type) => {
        if(type=="eminem") return "account_balance"
        if(type=="library") return "local_library"
        if(type=="park") return "local_florist"
        if(type=="food") return "local_dining"
    }


    const toggleClass = (idName) => {
        // console.log(elem.children[0].classList.value)
        document.getElementById(idName).classList.toggle('extendedActiveMenu');
    }

    const directionsClickHandler = () => {
        getIndividualRoute()
    }

    const placesModal = async ({lat, lng:lon}) => {

        const placesData = await API.get(`/places?lat=${lat.toString()}&lon=${lon.toString()}`)
        // console.log(await placesData.data.map(e => {type: e.type}))
        const placesElem = await placesData.data.slice(0,6).map(e => (
                        <div className={classes.placeRecom}>
                             <p><i className="material-icons">{getTypeOfPlace(e.type)}</i></p>
                             <p className={classes.nameOfInterimPlace}>{e.name}</p>
                        </div>
                    ))
        console.log("before calling set modal")
        console.log(placesElem)
        activateAndSetModal(<div>
            <h1>Places near you:</h1>
            {placesElem}
        </div>);
        // console.log(placesData.data);
        // setModalElem();
    }

    const activateAndSetModal = (elem) => {

        // console.log("modal activated");
        setModalElem(elem);
        document.getElementById("modal").classList.add('activeModal');
        document.getElementById("modal").style.top=`calc(${window.pageYOffset}px + 50%)`;
    }
    const whichMedia = () => {
        if(media == "youtube") return classes.youtube
        if(media == "spotify") return classes.spotify
        if(media == "netflix") return classes.netflix
    }


    const whichUrl = () => {
        if(media == "youtube") return "www.youtube.com"
        if(media == "spotify") return "www.spotify.com"
        if(media == "netflix") return "www.netflix.com"
    }
    const details = () => {
        return routesData.map(({details, legs, fares}, index) => {
            return (
                <div>
                    <div className={classes.data} key={index}>
                        <div className={classes.travelSection}>
                            <div className={[classes.blank, classes.section].join(" ")}>
                                {`$${fares/100}`}
                            </div>

                            <div className={classes.section}>
                                {(index != 0) && <div onClick={(e) => toggleClass(`extendedMenu${getKey(legs.start_location, legs.end_location)}`)}
                                                      className={[classes.extraTime, classes.linedIcon2].join(" ")}>
                                    <i className="material-icons">
                                        watch_later
                                    </i>
                                    <div id={`extendedMenu${getKey(legs.start_location, legs.end_location)}`} className={[classes.extendedMenu].join(" ")}>
                                        <div onClick={() => placesModal(legs.start_location)} className={classes.icon}>
                                            <i className="material-icons">
                                                place
                                            </i>
                                        </div>
                                        <div className={[classes.icon, whichMedia()].join(" ")}>
                                            <a style={{'height':'100%', 'width':'100%'}} href={whichUrl()}></a>
                                        </div>
                                    </div>
                                </div>}
                                <div
                                    onClick={() => {

                                        activateAndSetModal(getIndividualRoute(getKey(legs.start_location, legs.end_location)))
                                    }}
                                    className={[classes.SMRT, (index != 0) ? classes.linedIcon2 : classes.linedIcon, "directionClick"].join(" ")}>
                                    <i className="material-icons">
                                        directions_transit
                                    </i>
                                </div>
                            </div>

                            <div className={[classes.details, classes.section].join(" ")}>
                                <p>{`Leave by ${legs.departure_time.text}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.place}>
                        <p className={classes.blank}></p>
                        <p className={classes.placeName}>{`${details.destination}`}</p>
                        <p className={classes.time}>{`${legs.arrival_time.text}`}</p>
                    </div>

                </div>
            )
        });
    }

    const totalMoney = () => {
        let tFares = 0;
        routesData.map(({fares}) => {
            tFares += parseInt(fares);
        })

        return tFares;
    }
    return (

        <div className={classes.Home}>
            <Navbar />

            <div>
                <div className={classes.home}>

                    {(!routesData)  && <Loading/>}

                    <div className={classes.totalCash}>{`$${totalMoney()/100}`}</div>
                    <i className="material-icons">
                        home
                    </i>
                    <div className={classes.blank}></div>
                </div>
                {details()}

                {/*{individualRoutes()}*/}

            </div>
            <Modal>
                {modalElem}
            </Modal>
        </div>
    );
}

export default Home;

