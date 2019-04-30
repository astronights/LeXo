import React, {useContext, useState} from 'react';
import classes from './AddQuestion.scss';
import API from "../../utils/API";
import ml5 from 'ml5';
import imageCompression from 'browser-image-compression';
import Loading from "../UI/Loading/Loading";
import Modal from "../Modal/Modal";
import ImageList from "./ImageList/ImageList";
import CameraImg from '../../assets/img/camera.svg';
import {UserContext} from "../../UserContext";
import Overlay from "../Overlay/Overlay";
import blobToBuffer from "blob-to-buffer";
import Recorder from 'react-mp3-recorder';
import {Redirect} from "react-router-dom";

const AddQuestion = () => {
    const [flag, setFlag] = useState(false);
    const [showThanks, setShowThanks] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [audio, setAudio] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [answer, setAnswer] = useState("");
    const [url, setUrl] = useState(CameraImg);
    const [word, setWord] = useState("");
    const [relatedImgs, setRelatedImgs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInp, setShowInp] = useState(false);

    const {inputLang, setInputLang} = useContext(UserContext);
    const [chooseInputLang, setChooseInputLang] = useState(false);
    const {userId: user_id} = JSON.parse(localStorage.getItem('userData'));


    const setInputLangFromOverlay = (lang) => {
        setChooseInputLang(false)
        setInputLang(lang[0]);
    }

    const blobToDataURL = (blob, callback) => {
        var a = new FileReader();
        a.onload = function (e) {
            callback(e.target.result);
        }
        a.readAsDataURL(blob);
    }

    const handleImageChange = async (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        console.log(file);

        var options = {
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);

        blobToDataURL(compressedFile, (dataURL) => {
            setUrl(dataURL);
            setLoading(true);
        });

        const classifier = ml5.imageClassifier('MobileNet', () => {
        });

        classifier.predict(document.getElementById("imgg"), async (err, results) => {
            let wordd = results[0].label.split(",")[0];
            setWord(results[0].label.split(",")[0]);
            console.log(wordd)
            const relatedImages = await API.post('/add-word', {word: wordd});

            let {flag, data} = relatedImages.data;
            setFlag(flag);
            if (!flag) setShowInp(true);
            else {
                setRelatedImgs(data);
                console.log(data);
                setShowModal(true);
            }
            setLoading(false);
        });

    }

    const finishUp = (ans) => {
        setShowModal(false);
        setUrl(ans);
        setShowInp(true);
    }

    const answerHandler = async (e) => {
        e.preventDefault();

        if (flag) { // word not in db
            let data = await API.post('/db-word', {lang: inputLang, url, tran: answer, word, audio});
        } else {
            let data  = await API.post('/answer', {user_id, lang: inputLang, tran: answer, word, audio});
            console.log({user_id, lang: inputLang, tran: answer, word, audio})
        }

        setShowThanks(true);
        setTimeout(() => {
            location.reload()
        }, 1000)
    }

    const _onRecordingComplete = (blob) => {
        blobToBuffer(blob, (err, buffer) => {
            if (err) {
                console.error(err)
                return
            }

            setAudio(buffer.toString('base64'));
            if (audioUrl) window.URL.revokeObjectURL(audioUrl)
            setAudioUrl(window.URL.createObjectURL(blob))
        })
    }

    const _onRecordingError = (err) => {
        console.log('recording error', err)
    }


    return (
        <div className={classes.AddQuestion}>

            <input className={classes.fileInput} accept="image/*" name="file" id="file" onChange={handleImageChange}
                   type="file"/>
            {/*<label htmlFor="file" style={{backgroundImage: `url(${url})`}}>*/}
            <label htmlFor="file" style={{backgroundImage: `url(${url})`}}>

            </label>
            <img style={{display: 'none'}} src={url} id="imgg" alt=""/>

            {
                showInp &&
                <div className={classes.inputBox}>
                    <form onSubmit={answerHandler}>
                        <div onClick={() => setChooseInputLang(true)}
                             className={classes.inputLang}>{inputLang.substr(0, 2).toUpperCase()}</div>
                        <input value={answer} onChange={(e) => setAnswer(e.target.value)} type="text"/>
                        <Recorder
                            onRecordingComplete={_onRecordingComplete}
                            onRecordingError={_onRecordingError}
                        />

                    </form>
                    {audioUrl && <audio controls src={audioUrl}></audio>}
                </div>
            }

            {/*{word}*/}


            {loading && <Loading/>}

            <Modal activeModal={showModal} closable={false}>
                <ImageList finishUp={finishUp} images={relatedImgs}/>
            </Modal>

            <Modal activeModal={showThanks}>
                <div className={classes.thanksModal}>Thank you! 🙌🏼</div>
            </Modal>


            <Overlay currentLang={inputLang} show={chooseInputLang} setLanguage={setInputLangFromOverlay}
                     isIndi={true}/>

        </div>
    );
}

export default AddQuestion;