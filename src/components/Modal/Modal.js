import React, {useEffect} from 'react';
import classes from './Modal.scss';

const Modal = ({activeModal, children}) => {

    useEffect(
        () => {
            document.onclick = (e) => {
                // console.log(e.target)
                let insideModal = e.target.closest("#modal");
                let directionClick = e.target.closest(".directionClick");
                let closeButton = e.target.closest("#closeButton");
                if(!directionClick && (!insideModal || closeButton)){
                    document.getElementById("modal").classList.remove('activeModal');
                    document.getElementById("modal").style.top=`calc(-${window.pageYOffset}px - 500%)`;
                }
            }
        }, []);

    return(
        <div id="modal" className={[classes.Modal, activeModal ? 'activeModal' : null].join(" ")}>
            {children}
            <div id="closeButton" className={classes.close}>
                <i className="material-icons">close</i>
            </div>
        </div>
    );
}

export default Modal;