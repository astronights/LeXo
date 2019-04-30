import React, {useState} from 'react';
import classes from './ImageList.scss';

const ImageList = ({finishUp, images}) => {

    const [url, setUrl] = useState(images[0]);
    const [index, setIndex] = useState(0);
    const [redirect, setRedirect] = useState(false);


    const incrementIndex = () => {
        if (index == images.length-1) {
            setRedirect(true);
            setTimeout(() => {
                location.reload();
            }, 1000)
        } else setIndex(index + 1);
    }

    return (
        <div className={classes.ImageList}>

            {redirect && <p>Sorry, try with a different image!</p>}
            {/*<p>{images[index]}</p>*/}
            <img style={{height: '300px', width: '300px'}} src={images[index]} alt=""/>
            {
                !redirect &&
                <div className={classes.buttons}>
                    <p className={classes.button} onClick={() => finishUp(images[index])}><i className="material-icons">check</i></p>
                    <p className={classes.button} onClick={incrementIndex}><i className="material-icons">clear</i></p>
                </div>
            }

        </div>
    );
}

export default ImageList;