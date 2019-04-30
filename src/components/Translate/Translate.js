import React, {useState} from 'react';
import classes from './Translate.scss';
import API from "../../utils/API";
import Overlay from "../Overlay/Overlay";
import blobToBuffer from 'blob-to-buffer';

const Translate = () => {


    const [input, setInput] = useState("");
    const [chooseLang, setChooseLang] = useState(false);
    const [playingAudio, setPlayingAudio] = useState(false);
    const [spin, setSpin] = useState(false);
    const [isIndi, setIsIndi] = useState(false);
    const [fromLang, setFromLang] = useState("English");
    const [toLang, setToLang] = useState("Khmu");
    const [output, setOutput] = useState("");
    const [to, setTo] = useState("kh");
    const [audio, setAudio] = useState("");
    const [url, setUrl] = useState("");

    const setLang = (lang) => {
        isIndi ? setToLang(lang[0]) : setFromLang(lang[0]);
        setTo(lang[1]);
        setIsIndi(false);
        setChooseLang(!chooseLang)
    }

    const translateInput = async () => {
        setSpin(true);
        const {data} = await API.post('/translate', {from: 'en', to, word: input.toLowerCase()});
        setOutput(data.word);
        // console.log("from db: ",data.audio)


        let blob = new Blob([Buffer.from(data.audio, 'base64')], {type: 'audio/mpeg'});
        if (url) window.URL.revokeObjectURL(url)
        setUrl(window.URL.createObjectURL(blob))
        setSpin(false);
    }

    const onChangeToLang = () => {
        setSpin(true);
        setIsIndi(true);

        setTimeout(() => {
            setChooseLang(true);
            setSpin(false);
        }, 400);

    }
    let audioElem = React.createRef();
    const playAudio = () => {
        setPlayingAudio(true);
        let a = audioElem.current
        a.play()
        a.addEventListener("ended", function () {
            a.currentTime = 0;
            setPlayingAudio(false)
        });
    }
    return (
        <React.Fragment>
            <div className={classes.Translate}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    translateInput()
                }}><input className={classes.inputBox} type="text" value={input}
                          onChange={(e) => setInput(e.target.value)}/></form>
                <div className={classes.middleBox}>
                    <p onClick={() => setChooseLang(true)}>{fromLang}</p>
                    <div className={classes.submit} onClick={translateInput}>
                        <i className={["material-icons", spin ? classes.spinMe : null].join(" ")}>autorenew</i>
                    </div>
                    <p onClick={onChangeToLang}>{toLang}</p>
                </div>
                <div className={classes.outputBox}>
                    <p>
                        {output}
                        {url && <i className={["material-icons", playingAudio ? classes.active : null].join(" ")}
                                   onClick={playAudio}>
                            volume_up
                        </i>}
                    </p>

                    {url && <audio ref={audioElem} src={url}></audio>}
                </div>

            </div>
            <Overlay currentLang={isIndi ? to : fromLang} show={chooseLang} setLanguage={setLang} isIndi={isIndi}/>
        </React.Fragment>

    );
}

export default Translate;