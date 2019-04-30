import React, {useContext, useEffect, useState} from 'react';
import classes from './Overlay.scss';
import API from "../../utils/API";
import {UserContext} from "../../UserContext";
const Overlay = ({setLanguage, show, currentLang, isIndi}) => {

    const [langs, setLangs] = useState([]);
    const [newLang, setNewLang] = useState("");

    const {setInputLang} = useContext(UserContext);

    const fetchLangs = async () => {
        let {data} = await API.get('/languages');
        // console.log(data)
        data = data.map(l => [l, l.substr(0,2).toLowerCase()]);
        const allLangs = "Azerbaijan,az;Malayalam,ml;Albanian,sq;Maltese,mt;Amharic,am;Macedonian,mk;English,en;Maori,mi;Arabic,ar;Marathi,mr;Armenian,hy;Mari,mhr;Afrikaans,af;Mongolian,mn;Basque,eu;German,de;Bashkir,ba;Nepali,ne;Belarusian,be;Norwegian,no;Bengali,bn;Punjabi,pa;Burmese,my;Papiamento,pap;Bulgarian,bg;Persian,fa;Bosnian,bs;Polish,pl;Welsh,cy;Portuguese,pt;Hungarian,hu;Romanian,ro;Vietnamese,vi;Russian,ru;Haitian(Creole),ht;Cebuano,ceb;Galician,gl;Serbian,sr;Dutch,nl;Sinhala,si;Hill-Mari,mrj;Slovakian,sk;Greek,el;Slovenian,sl;Georgian,ka;Swahili,sw;Gujarati,gu;Sundanese,su;Danish,da;Tajik,tg;Hebrew,he;Thai,th;Yiddish,yi;Tagalog,tl;Indonesian,id;Tamil,ta;Irish,ga;Tatar,tt;Italian,it;Telugu,te;Icelandic,is;Turkish,tr;Spanish,es;Udmurt,udm;Kazakh,kk;Uzbek,uz;Kannada,kn;Ukrainian,uk;Catalan,ca;Urdu,ur;Kyrgyz,ky;Finnish,fi;Chinese,zh;French,fr;Korean,ko;Hindi,hi;Xhosa,xh;Croatian,hr;Khmer,km;Czech,cs;Laotian,lo;Swedish,sv;Latin,la;Scottish,gd;Latvian,lv;Estonian,et;Lithuanian,lt;Esperanto,eo;Luxembourgish,lb;Javanese,jv;Malagasy,mg;Japanese,ja;Malay,ms"
            .split(";")
            .map(x => x.split(","));
        if(!isIndi) {
            // console.log("i'm here!");
            setLangs(allLangs);
        }
        else{
            // console.log(data)
            setLangs(data);
        }
    }
    useEffect(() => {
        fetchLangs();
    }, [isIndi]);


    const toCamelCase = x => {
        return x[0].toUpperCase()+x.substr(1);
    }
    const submitNewLang = async (e) => {
        e.preventDefault();

        const data = await API.post('/addlang', {lang:toCamelCase(newLang)});
        setInputLang(toCamelCase(newLang));
        fetchLangs()
        setNewLang("")
        // console.log(data);
    }


    return(
        <div className={[classes.Overlay, show ? classes.activeOverlay : null].join(" ")}>
            <h2>Choose your language:</h2>

            {langs.map(l => {
                return (
                    <p key={l[0]} className={[(l[0] === currentLang || l[1] === currentLang) ? classes.highlight : null].join(" ")} onClick={()=>setLanguage(l)}>{l[0]}</p>
                )
            })}

            {
                isIndi &&
                <div className={classes.addLang}>
                    <p>Add your own language:</p>
                    <form onSubmit={submitNewLang}>
                        <input type="text" value={newLang} onChange={(e) => setNewLang(e.target.value)} />
                    </form>

                </div>
            }
        </div>
    );
}

export default Overlay;