import React, {useContext, useEffect, useState} from 'react';
import classes from './Game.scss';
import API from "../../utils/API";
import Overlay from "../Overlay/Overlay";
import {UserContext} from "../../UserContext";
import Recorder from 'react-mp3-recorder'
import Modal from '../Modal/Modal';
import base64 from 'base-64';
import blobToBuffer from 'blob-to-buffer'


const Game = () => {

    const [nextQ, setNextQ] = useState(false);
    const [answer, setAnswer] = useState("");
    const [url, setUrl] = useState("");
    const [audio, setAudio] = useState("");
    const [question, setQuestion] = useState({});
    const [lang1, setLang1] = useState("hi");
    const [lang2, setLang2] = useState("fr");
    const [overlayLang, setOverlayLang] = useState("en");

    const [showThanks, setShowThanks] = useState(false);
    const [chooseLang, setChooseLang] = useState(false);
    const [chooseInputLang, setChooseInputLang] = useState(false);

    const {inputLang, setInputLang, incrementPoints} = useContext(UserContext);
    const {userId: user_id} = JSON.parse(localStorage.getItem('userData'));



    useEffect(() => {

        const {lang1: l1, lang2: l2} = JSON.parse(localStorage.getItem('langs')) || {lang1:null,lang2:null};
        let lang1ToSearch, lang2ToSearch;
        if(l1 != null && l2 != null){
            if(lang1 != l1) setLang1(l1);
            if(lang2 != l2) setLang1(l2);
            lang1ToSearch = lang1 != l1 ? l1 : lang1;
            lang2ToSearch = lang2 != l2 ? l2 : lang2;
        }
        else {
            lang1ToSearch= lang1;
            lang2ToSearch= lang2;
        }
        // console.log("lang1", lang1ToSearch)
        // console.log("lang2", lang2ToSearch)

        API.get(`/word?lang1=${lang1ToSearch}&lang2=${lang2ToSearch}&user_id=${user_id}`)
            .then(({data}) => {
                // console.log(data);
                setQuestion(data)
            });
    },  [nextQ]);


    const skipQuestion = async () =>{
        const {data}  = await API.post('/skip', {user_id})
        // console.log(data)
        changeQuestion()
    }
    const changeQuestion = () => {
        setQuestion({});
        setAudio("");
        setUrl("");
        setAnswer("");
        setNextQ(!nextQ);
    }

    const answerHandler = async (e) => {
        e.preventDefault();
        if(answer.length != 0){
            setShowThanks(true);
            // console.log(
            //     {
            //         user_id,
            //         word: question.eng,
            //         lang: inputLang,
            //         tran:answer,
            //         audio
            //     }
            // );

            const {data} = await API.post('/answer', {
                user_id,
                word: question.eng,
                lang: inputLang,
                tran:answer,
                audio
            });

            incrementPoints(5);

            setTimeout(()=>{
                setShowThanks(false);
            }, 800);


        }

        changeQuestion();

    }

    const startChooseLanguage = (lang) => {
        setOverlayLang(lang);
        setChooseLang(true);
    }
    const closeChooseLanguage = async (lang) => {
        //lang: [full, shortcode]
        // console.log(lang);

        const {data} = await API.post('/one-word', {word: question.eng, lang:lang[1]})
        overlayLang === lang1 ? setLang1(lang[1]) : setLang2(lang[1]);
        if(overlayLang === lang1){
          setQuestion({...question, word1:data.text})
        }
        else{
            setQuestion({...question, word2:data.text})
        }
        setChooseLang(false);
        // console.log({lang1, lang2})
        localStorage.setItem('langs', JSON.stringify((overlayLang === lang1) ? {lang1:lang[1], lang2} : {lang1, lang2:lang[1]}));
    }

    const setInputLangFromOverlay = (lang) => {
        setChooseInputLang(false)
        setInputLang(lang[0]);
    }

    const _onRecordingComplete = (blob) => {
        blobToBuffer(blob, (err, buffer) => {
            if (err) {
                console.error(err)
                return
            }

            setAudio(buffer.toString('base64'));
            if(url) window.URL.revokeObjectURL(url)
            setUrl(window.URL.createObjectURL(blob))
        })
    }

    const _onRecordingError = (err) => {
        console.log('recording error', err)
    }

    return(
        <div className={classes.Game}>
            <div className={classes.question}>
                <p className={classes.skipButton} onClick={skipQuestion}>skip</p>
                {
                    <div style={{backgroundImage: `url(${question.url})`}} className={classes.qImage}></div>
                }
                <div className={classes.langs}>
                    <p onClick={() => startChooseLanguage(lang1)}>{question.word1 ? question.word1 : "loading.."}</p>
                    <p onClick={() => startChooseLanguage(lang2)}>{question.word2 ? question.word2: "loading.."}</p>
                </div>
                <form onSubmit={answerHandler} className={classes.answerBox}>
                    <div onClick={() => setChooseInputLang(true)} className={classes.inputLang}>{inputLang.substr(0,2).toUpperCase()}</div>
                    <input value={answer} onChange={(e) => setAnswer(e.target.value)} type="text"/>
                    <Recorder
                        onRecordingComplete={_onRecordingComplete}
                        onRecordingError={_onRecordingError}
                    />
                </form>

                {url && <audio controls src={url}></audio>}
            </div>




            <Overlay currentLang={overlayLang} show={chooseLang} setLanguage={closeChooseLanguage} />
            <Overlay currentLang={inputLang} show={chooseInputLang} setLanguage={setInputLangFromOverlay} isIndi={true}/>
            <Modal activeModal={showThanks}>
                <div className={classes.thanksModal}>Thank you! 🙌🏼</div>
            </Modal>


        </div>
    )
}

export default Game;