import React, {useEffect, useState} from "react";
import {UserProvider} from "../../UserContext";
import API from '../../utils/API';

const Page = ({children}) => {

    const [data, setData] = useState([]);
    const [homeAddress, setHomeAddress] = useState('');
    const [fareType, setFareType] = useState('');
    const [media, setMedia] = useState('');
    const [month, setMonth] = useState(3);
    const [day, setDay] = useState(24);

    async function fetchData(){
        console.log('Fetching data from api :)');
        let url, apiData;

        if(homeAddress && month){
            url = `/route?accessToken=${JSON.parse(localStorage.getItem("userData")).token}&homeAddress=${homeAddress.replace(/\s+/g, '+')}&fareType=${fareType.replace(/\s+/g, '+')}&month=${month}&day=${day}`
        }
        else url = `/route?accessToken=${JSON.parse(localStorage.getItem("userData")).token}`

        // apiData = {data: [{"details":{"start_place":"Hall 5 NTU","destination":"Starbucks NTU"},"legs":{"arrival_time":{"text":"10:00am","time_zone":"Asia/Singapore","value":1553479200},"departure_time":{"text":"9:47am","time_zone":"Asia/Singapore","value":1553478441},"distance":{"text":"1.6 km","value":1577},"duration":{"text":"13 mins","value":759},"end_address":"76 Nanyang Dr, #01-06 NTU North Spine, Singapore 637331","end_location":{"lat":1.3470484,"lng":103.679647},"start_address":"8 Nanyang Dr, Singapore 637719","start_location":{"lat":1.3441254,"lng":103.6875384},"steps":[{"distance":{"text":"0.2 km","value":221},"duration":{"text":"3 mins","value":169},"end_location":{"lat":1.3456759,"lng":103.6878333},"html_instructions":"Walk to Hall 1","polyline":{"points":"yoeGcnzwREIUYQUSW[[OOMCIAGAG?[?GK_@P{AdA"},"start_location":{"lat":1.3441254,"lng":103.6875384},"steps":[{"distance":{"text":"94 m","value":94},"duration":{"text":"1 min","value":66},"end_location":{"lat":1.3446756,"lng":103.6881679},"html_instructions":"Head <b>northeast</b> on <b>Nanyang Dr</b>","polyline":{"points":"yoeGcnzwREIUYQUSW[[OO"},"start_location":{"lat":1.3441254,"lng":103.6875384},"travel_mode":"WALKING"},{"distance":{"text":"0.1 km","value":127},"duration":{"text":"2 mins","value":103},"end_location":{"lat":1.3456759,"lng":103.6878333},"html_instructions":"Turn <b>left</b> onto <b>Lien Ying Chow Dr</b>","maneuver":"turn-left","polyline":{"points":"gseGarzwRMCIAGAG?[?GK_@P{AdA"},"start_location":{"lat":1.3446756,"lng":103.6881679},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"1.2 km","value":1195},"duration":{"text":"4 mins","value":240},"end_location":{"lat":1.3479314,"lng":103.6805007},"html_instructions":"Bus towards Boon Lay","polyline":{"points":"kyeGyozwR@@qBrAeBzBKLYPKDSDU@Q@C?OAI?U?WAK?WAo@CG?I?O@I@A?MBUDKHQNKLEJEFCLI\\Gh@CLGTEJILGF?@IHONSPKFKFSB@B@B@B?B?@ADADIDG@C?C?GCSVSXGJKTERCPAL?L@P@NBJBLBF@@R`@P\\DHbAvBdAxB^j@@?@?@?@?@?@?@@@??@@?@@?@@?@B@D?BABADPj@j@lAHRTd@JR`@z@JPJE"},"start_location":{"lat":1.345655,"lng":103.6878056},"transit_details":{"arrival_stop":{"location":{"lat":1.3479314,"lng":103.6805007},"name":"Lee Wee Nam Lib"},"arrival_time":{"text":"9:58am","time_zone":"Asia/Singapore","value":1553479090},"departure_stop":{"location":{"lat":1.345655,"lng":103.6878056},"name":"Hall 1"},"departure_time":{"text":"9:54am","time_zone":"Asia/Singapore","value":1553478850},"headsign":"Boon Lay","headway":240,"line":{"agencies":[{"name":"SBS Transit","phone":"011 65 1800 225 5663","url":"https://www.sbstransit.com.sg/"}],"color":"#55dd33","name":"179","short_name":"179","text_color":"#000000","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png","name":"Bus","type":"BUS"}},"num_stops":4},"travel_mode":"TRANSIT"},{"distance":{"text":"0.2 km","value":161},"duration":{"text":"2 mins","value":110},"end_location":{"lat":1.3470484,"lng":103.679647},"html_instructions":"Walk to 76 Nanyang Dr, #01-06 NTU North Spine, Singapore 637331","polyline":{"points":"wgfGabywR`@|@j@fALVFLHAF?FAv@?"},"start_location":{"lat":1.3479592,"lng":103.6804851},"steps":[{"distance":{"text":"0.1 km","value":113},"duration":{"text":"1 min","value":77},"end_location":{"lat":1.3474595,"lng":103.6796273},"html_instructions":"Head <b>southwest</b> on <b>Nanyang Dr</b>","polyline":{"points":"wgfGabywR`@|@j@fALVFL"},"start_location":{"lat":1.3479592,"lng":103.6804851},"travel_mode":"WALKING"},{"distance":{"text":"48 m","value":48},"duration":{"text":"1 min","value":33},"end_location":{"lat":1.3470484,"lng":103.679647},"html_instructions":"Turn <b>left</b><div style=\"font-size:0.9em\">Restricted usage road</div><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-left","polyline":{"points":"sdfGu|xwRHAF?FAv@?"},"start_location":{"lat":1.3474595,"lng":103.6796273},"travel_mode":"WALKING"}],"travel_mode":"WALKING"}],"traffic_speed_entry":[],"via_waypoint":[]},"fares":"38"},{"details":{"start_place":"Starbucks NTU","destination":"Lifelong Learning Institute Eunos"},"legs":{"arrival_time":{"text":"2:30pm","time_zone":"Asia/Singapore","value":1553495400},"departure_time":{"text":"1:14pm","time_zone":"Asia/Singapore","value":1553490892},"distance":{"text":"32.3 km","value":32270},"duration":{"text":"1 hour 15 mins","value":4508},"end_address":"11 Eunos Rd 8, Singapore 408601","end_location":{"lat":1.3194837,"lng":103.8927227},"start_address":"76 Nanyang Dr, #01-06 NTU North Spine, Singapore 637331","start_location":{"lat":1.3470484,"lng":103.679647},"steps":[{"distance":{"text":"0.2 km","value":161},"duration":{"text":"2 mins","value":145},"end_location":{"lat":1.3479592,"lng":103.6804851},"html_instructions":"Walk to Lee Wee Nam Lib","polyline":{"points":"abfGy|xwRw@?G@G?I@GMMWk@gAa@}@"},"start_location":{"lat":1.3470484,"lng":103.679647},"steps":[{"distance":{"text":"48 m","value":48},"duration":{"text":"1 min","value":38},"end_location":{"lat":1.3474595,"lng":103.6796273},"html_instructions":"Head <b>north</b> toward <b>Nanyang Dr</b><div style=\"font-size:0.9em\">Restricted usage road</div>","polyline":{"points":"abfGy|xwRw@?G@G?I@"},"start_location":{"lat":1.3470484,"lng":103.679647},"travel_mode":"WALKING"},{"distance":{"text":"0.1 km","value":113},"duration":{"text":"2 mins","value":107},"end_location":{"lat":1.3479592,"lng":103.6804851},"html_instructions":"Turn <b>right</b> onto <b>Nanyang Dr</b>","maneuver":"turn-right","polyline":{"points":"sdfGu|xwRGMMWk@gAa@}@"},"start_location":{"lat":1.3474595,"lng":103.6796273},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"4.2 km","value":4150},"duration":{"text":"17 mins","value":1020},"end_location":{"lat":1.337773,"lng":103.697289},"html_instructions":"Bus towards Boon Lay","polyline":{"points":"qgfGcbywRKD`@|@j@fALVHPXd@JXFNBHBJ@JBLBh@FhAZ?@?`@?@?H?F?DAF?BAJAVEJ?HAL?B?RAR?~C@RARAVCJCb@K`A]LEnAa@TGNCLAdDQf@Et@Ch@CD?NAvABd@@bADP?RCNETKX[rA{AJMRc@DSDg@?[AqA@AMaCWmBq@qBa@u@c@q@o@}@MOOSQKWKWG]EY?}BZa@D]DQ@OAUCOIOOOSsBiCGGGOGSAW@e@De@NaBFs@@Y@[A_@C[Ig@AE@KCCEOEMGOMWIOGKU]UYSWSWYYQQ]e@a@g@w@_AaBgBYYIIMGCCOGICMCQCO?{AB?@?@?@?@A??@?@A??@A??@A?A@A??@A?A?A?A?A?A?A??AA?A??AA??AA??AAA?AA??A?A?A?A@CBEBCCe@AQ@G?A@EBGDEBCDC@APGl@Kv@Q|@WrAe@~@_@@IBE@CBC@A^O?A?A@??ABADCLCNCFC`@OFEHIJIBA@C@C@CFETQNMLOFE@ADEDCFGR@L@vBaBNKJINMrA_Av@i@ZSJKb@_@lBaB|@m@~AeAPM\\WhAo@PIb@YzAo@DAh@S`@MTIfEiAGgA@{C?_@M?"},"start_location":{"lat":1.3479314,"lng":103.6805007},"transit_details":{"arrival_stop":{"location":{"lat":1.337773,"lng":103.697289},"name":"Pioneer Stn Exit B"},"arrival_time":{"text":"1:38pm","time_zone":"Asia/Singapore","value":1553492298},"departure_stop":{"location":{"lat":1.3479314,"lng":103.6805007},"name":"Lee Wee Nam Lib"},"departure_time":{"text":"1:21pm","time_zone":"Asia/Singapore","value":1553491278},"headsign":"Boon Lay","headway":240,"line":{"agencies":[{"name":"SBS Transit","phone":"011 65 1800 225 5663","url":"https://www.sbstransit.com.sg/"}],"color":"#55dd33","name":"179","short_name":"179","text_color":"#000000","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png","name":"Bus","type":"BUS"}},"num_stops":9},"travel_mode":"TRANSIT"},{"distance":{"text":"74 m","value":74},"duration":{"text":"1 min","value":70},"end_location":{"lat":1.3376018,"lng":103.6974089},"html_instructions":"Walk to Pioneer","polyline":{"points":"{gdGak|wR?^U@BAl@w@"},"start_location":{"lat":1.3377369,"lng":103.6972887},"steps":[{"distance":{"text":"18 m","value":18},"duration":{"text":"1 min","value":12},"end_location":{"lat":1.3377383,"lng":103.6971282},"html_instructions":"Head <b>west</b> on <b>Jurong West Street 63</b>","polyline":{"points":"{gdGak|wR?^"},"start_location":{"lat":1.3377369,"lng":103.6972887},"travel_mode":"WALKING"},{"distance":{"text":"16 m","value":16},"duration":{"text":"1 min","value":17},"end_location":{"lat":1.3378476,"lng":103.6971248},"html_instructions":"Turn <b>right</b>","maneuver":"turn-right","polyline":{"points":"{gdGaj|wRU@"},"start_location":{"lat":1.3377383,"lng":103.6971282},"travel_mode":"WALKING"},{"distance":{"text":"40 m","value":40},"duration":{"text":"1 min","value":41},"end_location":{"lat":1.3376018,"lng":103.6974089},"html_instructions":"Take entrance <span class=\"location\">B</span>","polyline":{"points":"mhdGaj|wRl@w@"},"start_location":{"lat":1.3378316,"lng":103.6971295},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"27.7 km","value":27693},"duration":{"text":"43 mins","value":2580},"end_location":{"lat":1.3181607,"lng":103.8931436},"html_instructions":"Subway towards Pasir Ris","polyline":{"points":"_gdGyk|wRE?@gJBqI@gJQuBi@cCuBwHW{@kAeEk@uBm@cBaCaGkAqCu@gCoA}EoBqHmCmK}CmL_DiL}@{FAG_@cCk@wDMaBCaBBsBBaALiAlBsKHgA@{ED{DAcB`@_Cp@}BbAqBjDmFpFiIpFeInEwGpCyDbEwFlBeCp@u@xEsCjF_CnEqBf@U~E}BtAgA`AeAt@oAbBeDp@yA^gAbBuDz@mCzAuDd@_BTkBJuBG_ED_BJiBT}AbBkGb@eC^kB~@yHl@mEViA`@mAf@kA`A{Ap@k@v@k@hAm@lE_BnIuC~EkBpGoDzEcDvIgF~B{@vFmBDAlDgAvBaAx@g@pAgAjAwAl@iAr@}BVyANgDSkEi@qJk@aJ[yFIcCHeBT}A^yAb@iAn@kAjAyBz@_BxC_GbFwJtDgHVk@Xu@HWNq@Nq@JeAHcBb@{Jd@_KJsBXsGJmALwARcA\\qA|@sBXk@l@u@rBeCnFoGzEyF|@oA~AkBZ_@hAyAxBsBrDqEfDyDrFoGxF{GfAiAlA}@hEaCbB}@vC}AvCeB~C}CnByBx@qAr@_BX_ATkAf@{Fr@eIx@eKP{AReATq@zA}D@GpAiDt@kC\\aCLwCNsJXqCbDoFbF_IlA}IVmBBmKBcJ@cDUcE^iAtEmE~DuD|A_CpBsDvF{JtCaFR]DCxBoBfHuDlFuCpCqC^oA@kCH_K]cCk@aE{FaDiHaE{HkEgGgDi@O{@EmDIwDIqBAwAS}E_BsIqCcKiDsBQqBZeCrAgD~DGJ_C~A{Dj@w@A{@OiFuEqDcD}GgGwGiGc@_@{G{GyIyIsHsH_GaGoAoA{@aAk@m@_IqFwAaIqA}HWiAi@mCg@cCS_Aq@kBkCwEIMyBaE_DuGuAcCgDwFoCuE_AsBo@qB[gBi@{Fi@yFu@gFWiCMkAg@}FOgBOaB{@yH_AqJ_AcJY}CWoDUiDD?"},"start_location":{"lat":1.3376018,"lng":103.6974089},"transit_details":{"arrival_stop":{"location":{"lat":1.3181607,"lng":103.8931436},"name":"Paya Lebar"},"arrival_time":{"text":"2:27pm","time_zone":"Asia/Singapore","value":1553495249},"departure_stop":{"location":{"lat":1.3376018,"lng":103.6974089},"name":"Pioneer"},"departure_time":{"text":"1:44pm","time_zone":"Asia/Singapore","value":1553492669},"headsign":"Pasir Ris","headway":300,"line":{"agencies":[{"name":"SMRT","phone":"011 65 1800 336 8900","url":"http://www.smrt.com.sg/"}],"color":"#189e4a","name":"East West Line","text_color":"#ffffff","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png","name":"Subway","type":"SUBWAY"}},"num_stops":20},"travel_mode":"TRANSIT"},{"distance":{"text":"0.2 km","value":192},"duration":{"text":"3 mins","value":150},"end_location":{"lat":1.3194837,"lng":103.8927227},"html_instructions":"Walk to 11 Eunos Rd 8, Singapore 408601","polyline":{"points":"om`GcsbyRKdAgAmAA@KFC@m@FE?A?E?CACCCAKKYDq@HM@Fj@B\\"},"start_location":{"lat":1.3181607,"lng":103.8931436},"steps":[{"distance":{"text":"39 m","value":39},"duration":{"text":"1 min","value":40},"end_location":{"lat":1.318216,"lng":103.8927883},"html_instructions":"Take exit <span class=\"location\">A</span>","polyline":{"points":"om`GcsbyRKdA"},"start_location":{"lat":1.3181607,"lng":103.8931436},"travel_mode":"WALKING"},{"distance":{"text":"58 m","value":58},"duration":{"text":"1 min","value":39},"end_location":{"lat":1.3190852,"lng":103.8931783},"html_instructions":"Head <b>north</b> toward <b>Eunos Rd 8</b>","polyline":{"points":"cp`GksbyRA@KFC@m@FE?A?E?CACCCAKK"},"start_location":{"lat":1.3185786,"lng":103.8931835},"travel_mode":"WALKING"},{"distance":{"text":"50 m","value":50},"duration":{"text":"1 min","value":35},"end_location":{"lat":1.3195423,"lng":103.8930879},"html_instructions":"Turn <b>left</b> onto <b>Eunos Rd 8</b>","maneuver":"turn-left","polyline":{"points":"is`GksbyRYDq@HM@"},"start_location":{"lat":1.3190852,"lng":103.8931783},"travel_mode":"WALKING"},{"distance":{"text":"45 m","value":45},"duration":{"text":"1 min","value":36},"end_location":{"lat":1.3194837,"lng":103.8927227},"html_instructions":"Turn <b>left</b> to stay on <b>Eunos Rd 8</b><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-left","polyline":{"points":"cv`GyrbyRFj@B\\"},"start_location":{"lat":1.3195423,"lng":103.8930879},"travel_mode":"WALKING"}],"travel_mode":"WALKING"}],"traffic_speed_entry":[],"via_waypoint":[]},"fares":"43"},{"details":{"start_place":"Lifelong Learning Institute Eunos","destination":"Marina Bay Sands"},"legs":{"arrival_time":{"text":"8:00pm","time_zone":"Asia/Singapore","value":1553515200},"departure_time":{"text":"7:30pm","time_zone":"Asia/Singapore","value":1553513436},"distance":{"text":"7.2 km","value":7185},"duration":{"text":"29 mins","value":1764},"end_address":"10 Bayfront Ave, Singapore 018956","end_location":{"lat":1.2823315,"lng":103.8599537},"start_address":"11 Eunos Rd 8, Singapore 408601","start_location":{"lat":1.3194837,"lng":103.8927227},"steps":[{"distance":{"text":"0.2 km","value":192},"duration":{"text":"3 mins","value":155},"end_location":{"lat":1.3181607,"lng":103.8931436},"html_instructions":"Walk to Paya Lebar","polyline":{"points":"wu`GopbyRC]Gk@LAp@IXEJJB@BBB@D?@?D?l@GBAJG@AfAlAJeA"},"start_location":{"lat":1.3194837,"lng":103.8927227},"steps":[{"distance":{"text":"45 m","value":45},"duration":{"text":"1 min","value":32},"end_location":{"lat":1.3194718,"lng":103.893102},"html_instructions":"Head <b>east</b> on <b>Eunos Rd 8</b>","polyline":{"points":"wu`GopbyRC]Gk@LA"},"start_location":{"lat":1.3194837,"lng":103.8927227},"travel_mode":"WALKING"},{"distance":{"text":"50 m","value":50},"duration":{"text":"1 min","value":39},"end_location":{"lat":1.3190852,"lng":103.8931783},"html_instructions":"Turn <b>right</b> to stay on <b>Eunos Rd 8</b>","maneuver":"turn-right","polyline":{"points":"uu`G{rbyRp@IXE"},"start_location":{"lat":1.3194718,"lng":103.893102},"travel_mode":"WALKING"},{"distance":{"text":"58 m","value":58},"duration":{"text":"1 min","value":44},"end_location":{"lat":1.3185786,"lng":103.8931835},"html_instructions":"Turn <b>right</b><div style=\"font-size:0.9em\">Destination will be on the right</div>","maneuver":"turn-right","polyline":{"points":"is`GksbyRJJB@BBB@D?@?D?l@GBAJG@A"},"start_location":{"lat":1.3190852,"lng":103.8931783},"travel_mode":"WALKING"},{"distance":{"text":"39 m","value":39},"duration":{"text":"1 min","value":40},"end_location":{"lat":1.3181607,"lng":103.8931436},"html_instructions":"Take entrance <span class=\"location\">A</span>","polyline":{"points":"{m`G}pbyRJeA"},"start_location":{"lat":1.318216,"lng":103.8927883},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"6.7 km","value":6719},"duration":{"text":"16 mins","value":960},"end_location":{"lat":1.2813386,"lng":103.8589551},"html_instructions":"Subway towards Marina Bay","polyline":{"points":"om`GcsbyRVbD|Fg@zBEhE\\nEd@vENnFGxDGnCHpBRl@Zh@`@r@hBtAvKLfAd@|Dj@fFRrBzBhGfCdH^bAxB|FpB|F|BvGvDdKfDdIDNnA`EbAdEh@bEl@~I^vHPpDj@lFhBhGrDxKL\\l@|AjAfDjAtCzAtAnCp@xB@|Dg@`KKD?xFK~BM`COrJDfIB`FDhE@nCXrD|@lI`EhFbCJHIL"},"start_location":{"lat":1.3181607,"lng":103.8931436},"transit_details":{"arrival_stop":{"location":{"lat":1.2813386,"lng":103.8589551},"name":"Bayfront"},"arrival_time":{"text":"7:56pm","time_zone":"Asia/Singapore","value":1553514971},"departure_stop":{"location":{"lat":1.3181607,"lng":103.8931436},"name":"Paya Lebar"},"departure_time":{"text":"7:40pm","time_zone":"Asia/Singapore","value":1553514011},"headsign":"Marina Bay","headway":420,"line":{"agencies":[{"name":"SMRT","phone":"011 65 1800 336 8900","url":"http://www.smrt.com.sg/"}],"color":"#f2ad27","name":"Circle Line","text_color":"#000000","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png","name":"Subway","type":"SUBWAY"}},"num_stops":6},"travel_mode":"TRANSIT"},{"distance":{"text":"0.3 km","value":274},"duration":{"text":"4 mins","value":229},"end_location":{"lat":1.2823315,"lng":103.8599537},"html_instructions":"Walk to 10 Bayfront Ave, Singapore 018956","polyline":{"points":"kgyFo}{xRhAl@CFGEaB{@w@e@y@e@SMMIMGR]KGEGCO?M@A"},"start_location":{"lat":1.2813386,"lng":103.8589551},"steps":[{"distance":{"text":"48 m","value":48},"duration":{"text":"1 min","value":49},"end_location":{"lat":1.2809674,"lng":103.8587319},"html_instructions":"Take exit <span class=\"location\">A</span>","polyline":{"points":"kgyFo}{xRhAl@"},"start_location":{"lat":1.2813386,"lng":103.8589551},"travel_mode":"WALKING"},{"distance":{"text":"0.2 km","value":181},"duration":{"text":"2 mins","value":140},"end_location":{"lat":1.2823313,"lng":103.859564},"html_instructions":"Head <b>northeast</b> toward <b>Sheares Link</b>","polyline":{"points":"eeyFy{{xRGEaB{@w@e@y@e@SMMIMG"},"start_location":{"lat":1.2809936,"lng":103.8586944},"travel_mode":"WALKING"},{"distance":{"text":"22 m","value":22},"duration":{"text":"1 min","value":18},"end_location":{"lat":1.2822924,"lng":103.8597502},"html_instructions":"Turn <b>right</b>","maneuver":"turn-right","polyline":{"points":"qmyFga|xRR]KG"},"start_location":{"lat":1.2823313,"lng":103.859564},"travel_mode":"WALKING"},{"distance":{"text":"23 m","value":23},"duration":{"text":"1 min","value":22},"end_location":{"lat":1.2823315,"lng":103.8599537},"html_instructions":"Turn <b>left</b><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-left","polyline":{"points":"imyFmb|xREGCO?M@A"},"start_location":{"lat":1.2822924,"lng":103.8597502},"travel_mode":"WALKING"}],"travel_mode":"WALKING"}],"traffic_speed_entry":[],"via_waypoint":[]},"fares":"53"}]}

        apiData = await API.get(url);
        setData(apiData.data);

        // console.log(url)
        // const apiData = {data: [{"details":{"start_place":"Hall 5 NTU","destination":"Starbucks NTU"},"legs":{"arrival_time":{"text":"10:00am","time_zone":"Asia/Singapore","value":1553479200},"departure_time":{"text":"9:47am","time_zone":"Asia/Singapore","value":1553478441},"distance":{"text":"1.6 km","value":1577},"duration":{"text":"13 mins","value":759},"end_address":"76 Nanyang Dr, #01-06 NTU North Spine, Singapore 637331","end_location":{"lat":1.3470484,"lng":103.679647},"start_address":"8 Nanyang Dr, Singapore 637719","start_location":{"lat":1.3441254,"lng":103.6875384},"steps":[{"distance":{"text":"0.2 km","value":221},"duration":{"text":"3 mins","value":169},"end_location":{"lat":1.3456759,"lng":103.6878333},"html_instructions":"Walk to Hall 1","polyline":{"points":"yoeGcnzwREIUYQUSW[[OOMCIAGAG?[?GK_@P{AdA"},"start_location":{"lat":1.3441254,"lng":103.6875384},"steps":[{"distance":{"text":"94 m","value":94},"duration":{"text":"1 min","value":66},"end_location":{"lat":1.3446756,"lng":103.6881679},"html_instructions":"Head <b>northeast</b> on <b>Nanyang Dr</b>","polyline":{"points":"yoeGcnzwREIUYQUSW[[OO"},"start_location":{"lat":1.3441254,"lng":103.6875384},"travel_mode":"WALKING"},{"distance":{"text":"0.1 km","value":127},"duration":{"text":"2 mins","value":103},"end_location":{"lat":1.3456759,"lng":103.6878333},"html_instructions":"Turn <b>left</b> onto <b>Lien Ying Chow Dr</b>","maneuver":"turn-left","polyline":{"points":"gseGarzwRMCIAGAG?[?GK_@P{AdA"},"start_location":{"lat":1.3446756,"lng":103.6881679},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"1.2 km","value":1195},"duration":{"text":"4 mins","value":240},"end_location":{"lat":1.3479314,"lng":103.6805007},"html_instructions":"Bus towards Boon Lay","polyline":{"points":"kyeGyozwR@@qBrAeBzBKLYPKDSDU@Q@C?OAI?U?WAK?WAo@CG?I?O@I@A?MBUDKHQNKLEJEFCLI\\Gh@CLGTEJILGF?@IHONSPKFKFSB@B@B@B?B?@ADADIDG@C?C?GCSVSXGJKTERCPAL?L@P@NBJBLBF@@R`@P\\DHbAvBdAxB^j@@?@?@?@?@?@?@@@??@@?@@?@@?@B@D?BABADPj@j@lAHRTd@JR`@z@JPJE"},"start_location":{"lat":1.345655,"lng":103.6878056},"transit_details":{"arrival_stop":{"location":{"lat":1.3479314,"lng":103.6805007},"name":"Lee Wee Nam Lib"},"arrival_time":{"text":"9:58am","time_zone":"Asia/Singapore","value":1553479090},"departure_stop":{"location":{"lat":1.345655,"lng":103.6878056},"name":"Hall 1"},"departure_time":{"text":"9:54am","time_zone":"Asia/Singapore","value":1553478850},"headsign":"Boon Lay","headway":240,"line":{"agencies":[{"name":"SBS Transit","phone":"011 65 1800 225 5663","url":"https://www.sbstransit.com.sg/"}],"color":"#55dd33","name":"179","short_name":"179","text_color":"#000000","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png","name":"Bus","type":"BUS"}},"num_stops":4},"travel_mode":"TRANSIT"},{"distance":{"text":"0.2 km","value":161},"duration":{"text":"2 mins","value":110},"end_location":{"lat":1.3470484,"lng":103.679647},"html_instructions":"Walk to 76 Nanyang Dr, #01-06 NTU North Spine, Singapore 637331","polyline":{"points":"wgfGabywR`@|@j@fALVFLHAF?FAv@?"},"start_location":{"lat":1.3479592,"lng":103.6804851},"steps":[{"distance":{"text":"0.1 km","value":113},"duration":{"text":"1 min","value":77},"end_location":{"lat":1.3474595,"lng":103.6796273},"html_instructions":"Head <b>southwest</b> on <b>Nanyang Dr</b>","polyline":{"points":"wgfGabywR`@|@j@fALVFL"},"start_location":{"lat":1.3479592,"lng":103.6804851},"travel_mode":"WALKING"},{"distance":{"text":"48 m","value":48},"duration":{"text":"1 min","value":33},"end_location":{"lat":1.3470484,"lng":103.679647},"html_instructions":"Turn <b>left</b><div style=\"font-size:0.9em\">Restricted usage road</div><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-left","polyline":{"points":"sdfGu|xwRHAF?FAv@?"},"start_location":{"lat":1.3474595,"lng":103.6796273},"travel_mode":"WALKING"}],"travel_mode":"WALKING"}],"traffic_speed_entry":[],"via_waypoint":[]},"fares":"83"},{"details":{"start_place":"Starbucks NTU","destination":"Lifelong Learning Institute Eunos"},"legs":{"arrival_time":{"text":"2:30pm","time_zone":"Asia/Singapore","value":1553495400},"departure_time":{"text":"1:14pm","time_zone":"Asia/Singapore","value":1553490892},"distance":{"text":"32.3 km","value":32270},"duration":{"text":"1 hour 15 mins","value":4508},"end_address":"11 Eunos Rd 8, Singapore 408601","end_location":{"lat":1.3194837,"lng":103.8927227},"start_address":"76 Nanyang Dr, #01-06 NTU North Spine, Singapore 637331","start_location":{"lat":1.3470484,"lng":103.679647},"steps":[{"distance":{"text":"0.2 km","value":161},"duration":{"text":"2 mins","value":145},"end_location":{"lat":1.3479592,"lng":103.6804851},"html_instructions":"Walk to Lee Wee Nam Lib","polyline":{"points":"abfGy|xwRw@?G@G?I@GMMWk@gAa@}@"},"start_location":{"lat":1.3470484,"lng":103.679647},"steps":[{"distance":{"text":"48 m","value":48},"duration":{"text":"1 min","value":38},"end_location":{"lat":1.3474595,"lng":103.6796273},"html_instructions":"Head <b>north</b> toward <b>Nanyang Dr</b><div style=\"font-size:0.9em\">Restricted usage road</div>","polyline":{"points":"abfGy|xwRw@?G@G?I@"},"start_location":{"lat":1.3470484,"lng":103.679647},"travel_mode":"WALKING"},{"distance":{"text":"0.1 km","value":113},"duration":{"text":"2 mins","value":107},"end_location":{"lat":1.3479592,"lng":103.6804851},"html_instructions":"Turn <b>right</b> onto <b>Nanyang Dr</b>","maneuver":"turn-right","polyline":{"points":"sdfGu|xwRGMMWk@gAa@}@"},"start_location":{"lat":1.3474595,"lng":103.6796273},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"4.2 km","value":4150},"duration":{"text":"17 mins","value":1020},"end_location":{"lat":1.337773,"lng":103.697289},"html_instructions":"Bus towards Boon Lay","polyline":{"points":"qgfGcbywRKD`@|@j@fALVHPXd@JXFNBHBJ@JBLBh@FhAZ?@?`@?@?H?F?DAF?BAJAVEJ?HAL?B?RAR?~C@RARAVCJCb@K`A]LEnAa@TGNCLAdDQf@Et@Ch@CD?NAvABd@@bADP?RCNETKX[rA{AJMRc@DSDg@?[AqA@AMaCWmBq@qBa@u@c@q@o@}@MOOSQKWKWG]EY?}BZa@D]DQ@OAUCOIOOOSsBiCGGGOGSAW@e@De@NaBFs@@Y@[A_@C[Ig@AE@KCCEOEMGOMWIOGKU]UYSWSWYYQQ]e@a@g@w@_AaBgBYYIIMGCCOGICMCQCO?{AB?@?@?@?@A??@?@A??@A??@A?A@A??@A?A?A?A?A?A?A??AA?A??AA??AA??AAA?AA??A?A?A?A@CBEBCCe@AQ@G?A@EBGDEBCDC@APGl@Kv@Q|@WrAe@~@_@@IBE@CBC@A^O?A?A@??ABADCLCNCFC`@OFEHIJIBA@C@C@CFETQNMLOFE@ADEDCFGR@L@vBaBNKJINMrA_Av@i@ZSJKb@_@lBaB|@m@~AeAPM\\WhAo@PIb@YzAo@DAh@S`@MTIfEiAGgA@{C?_@M?"},"start_location":{"lat":1.3479314,"lng":103.6805007},"transit_details":{"arrival_stop":{"location":{"lat":1.337773,"lng":103.697289},"name":"Pioneer Stn Exit B"},"arrival_time":{"text":"1:38pm","time_zone":"Asia/Singapore","value":1553492298},"departure_stop":{"location":{"lat":1.3479314,"lng":103.6805007},"name":"Lee Wee Nam Lib"},"departure_time":{"text":"1:21pm","time_zone":"Asia/Singapore","value":1553491278},"headsign":"Boon Lay","headway":240,"line":{"agencies":[{"name":"SBS Transit","phone":"011 65 1800 225 5663","url":"https://www.sbstransit.com.sg/"}],"color":"#55dd33","name":"179","short_name":"179","text_color":"#000000","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png","name":"Bus","type":"BUS"}},"num_stops":9},"travel_mode":"TRANSIT"},{"distance":{"text":"74 m","value":74},"duration":{"text":"1 min","value":70},"end_location":{"lat":1.3376018,"lng":103.6974089},"html_instructions":"Walk to Pioneer","polyline":{"points":"{gdGak|wR?^U@BAl@w@"},"start_location":{"lat":1.3377369,"lng":103.6972887},"steps":[{"distance":{"text":"18 m","value":18},"duration":{"text":"1 min","value":12},"end_location":{"lat":1.3377383,"lng":103.6971282},"html_instructions":"Head <b>west</b> on <b>Jurong West Street 63</b>","polyline":{"points":"{gdGak|wR?^"},"start_location":{"lat":1.3377369,"lng":103.6972887},"travel_mode":"WALKING"},{"distance":{"text":"16 m","value":16},"duration":{"text":"1 min","value":17},"end_location":{"lat":1.3378476,"lng":103.6971248},"html_instructions":"Turn <b>right</b>","maneuver":"turn-right","polyline":{"points":"{gdGaj|wRU@"},"start_location":{"lat":1.3377383,"lng":103.6971282},"travel_mode":"WALKING"},{"distance":{"text":"40 m","value":40},"duration":{"text":"1 min","value":41},"end_location":{"lat":1.3376018,"lng":103.6974089},"html_instructions":"Take entrance <span class=\"location\">B</span>","polyline":{"points":"mhdGaj|wRl@w@"},"start_location":{"lat":1.3378316,"lng":103.6971295},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"27.7 km","value":27693},"duration":{"text":"43 mins","value":2580},"end_location":{"lat":1.3181607,"lng":103.8931436},"html_instructions":"Subway towards Pasir Ris","polyline":{"points":"_gdGyk|wRE?@gJBqI@gJQuBi@cCuBwHW{@kAeEk@uBm@cBaCaGkAqCu@gCoA}EoBqHmCmK}CmL_DiL}@{FAG_@cCk@wDMaBCaBBsBBaALiAlBsKHgA@{ED{DAcB`@_Cp@}BbAqBjDmFpFiIpFeInEwGpCyDbEwFlBeCp@u@xEsCjF_CnEqBf@U~E}BtAgA`AeAt@oAbBeDp@yA^gAbBuDz@mCzAuDd@_BTkBJuBG_ED_BJiBT}AbBkGb@eC^kB~@yHl@mEViA`@mAf@kA`A{Ap@k@v@k@hAm@lE_BnIuC~EkBpGoDzEcDvIgF~B{@vFmBDAlDgAvBaAx@g@pAgAjAwAl@iAr@}BVyANgDSkEi@qJk@aJ[yFIcCHeBT}A^yAb@iAn@kAjAyBz@_BxC_GbFwJtDgHVk@Xu@HWNq@Nq@JeAHcBb@{Jd@_KJsBXsGJmALwARcA\\qA|@sBXk@l@u@rBeCnFoGzEyF|@oA~AkBZ_@hAyAxBsBrDqEfDyDrFoGxF{GfAiAlA}@hEaCbB}@vC}AvCeB~C}CnByBx@qAr@_BX_ATkAf@{Fr@eIx@eKP{AReATq@zA}D@GpAiDt@kC\\aCLwCNsJXqCbDoFbF_IlA}IVmBBmKBcJ@cDUcE^iAtEmE~DuD|A_CpBsDvF{JtCaFR]DCxBoBfHuDlFuCpCqC^oA@kCH_K]cCk@aE{FaDiHaE{HkEgGgDi@O{@EmDIwDIqBAwAS}E_BsIqCcKiDsBQqBZeCrAgD~DGJ_C~A{Dj@w@A{@OiFuEqDcD}GgGwGiGc@_@{G{GyIyIsHsH_GaGoAoA{@aAk@m@_IqFwAaIqA}HWiAi@mCg@cCS_Aq@kBkCwEIMyBaE_DuGuAcCgDwFoCuE_AsBo@qB[gBi@{Fi@yFu@gFWiCMkAg@}FOgBOaB{@yH_AqJ_AcJY}CWoDUiDD?"},"start_location":{"lat":1.3376018,"lng":103.6974089},"transit_details":{"arrival_stop":{"location":{"lat":1.3181607,"lng":103.8931436},"name":"Paya Lebar"},"arrival_time":{"text":"2:27pm","time_zone":"Asia/Singapore","value":1553495249},"departure_stop":{"location":{"lat":1.3376018,"lng":103.6974089},"name":"Pioneer"},"departure_time":{"text":"1:44pm","time_zone":"Asia/Singapore","value":1553492669},"headsign":"Pasir Ris","headway":300,"line":{"agencies":[{"name":"SMRT","phone":"011 65 1800 336 8900","url":"http://www.smrt.com.sg/"}],"color":"#189e4a","name":"East West Line","text_color":"#ffffff","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png","name":"Subway","type":"SUBWAY"}},"num_stops":20},"travel_mode":"TRANSIT"},{"distance":{"text":"0.2 km","value":192},"duration":{"text":"3 mins","value":150},"end_location":{"lat":1.3194837,"lng":103.8927227},"html_instructions":"Walk to 11 Eunos Rd 8, Singapore 408601","polyline":{"points":"om`GcsbyRKdAgAmAA@KFC@m@FE?A?E?CACCCAKKYDq@HM@Fj@B\\"},"start_location":{"lat":1.3181607,"lng":103.8931436},"steps":[{"distance":{"text":"39 m","value":39},"duration":{"text":"1 min","value":40},"end_location":{"lat":1.318216,"lng":103.8927883},"html_instructions":"Take exit <span class=\"location\">A</span>","polyline":{"points":"om`GcsbyRKdA"},"start_location":{"lat":1.3181607,"lng":103.8931436},"travel_mode":"WALKING"},{"distance":{"text":"58 m","value":58},"duration":{"text":"1 min","value":39},"end_location":{"lat":1.3190852,"lng":103.8931783},"html_instructions":"Head <b>north</b> toward <b>Eunos Rd 8</b>","polyline":{"points":"cp`GksbyRA@KFC@m@FE?A?E?CACCCAKK"},"start_location":{"lat":1.3185786,"lng":103.8931835},"travel_mode":"WALKING"},{"distance":{"text":"50 m","value":50},"duration":{"text":"1 min","value":35},"end_location":{"lat":1.3195423,"lng":103.8930879},"html_instructions":"Turn <b>left</b> onto <b>Eunos Rd 8</b>","maneuver":"turn-left","polyline":{"points":"is`GksbyRYDq@HM@"},"start_location":{"lat":1.3190852,"lng":103.8931783},"travel_mode":"WALKING"},{"distance":{"text":"45 m","value":45},"duration":{"text":"1 min","value":36},"end_location":{"lat":1.3194837,"lng":103.8927227},"html_instructions":"Turn <b>left</b> to stay on <b>Eunos Rd 8</b><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-left","polyline":{"points":"cv`GyrbyRFj@B\\"},"start_location":{"lat":1.3195423,"lng":103.8930879},"travel_mode":"WALKING"}],"travel_mode":"WALKING"}],"traffic_speed_entry":[],"via_waypoint":[]},"fares":"93"},{"details":{"start_place":"Lifelong Learning Institute Eunos","destination":"Marina Bay Sands"},"legs":{"arrival_time":{"text":"8:00pm","time_zone":"Asia/Singapore","value":1553515200},"departure_time":{"text":"7:30pm","time_zone":"Asia/Singapore","value":1553513436},"distance":{"text":"7.2 km","value":7185},"duration":{"text":"29 mins","value":1764},"end_address":"10 Bayfront Ave, Singapore 018956","end_location":{"lat":1.2823315,"lng":103.8599537},"start_address":"11 Eunos Rd 8, Singapore 408601","start_location":{"lat":1.3194837,"lng":103.8927227},"steps":[{"distance":{"text":"0.2 km","value":192},"duration":{"text":"3 mins","value":155},"end_location":{"lat":1.3181607,"lng":103.8931436},"html_instructions":"Walk to Paya Lebar","polyline":{"points":"wu`GopbyRC]Gk@LAp@IXEJJB@BBB@D?@?D?l@GBAJG@AfAlAJeA"},"start_location":{"lat":1.3194837,"lng":103.8927227},"steps":[{"distance":{"text":"45 m","value":45},"duration":{"text":"1 min","value":32},"end_location":{"lat":1.3194718,"lng":103.893102},"html_instructions":"Head <b>east</b> on <b>Eunos Rd 8</b>","polyline":{"points":"wu`GopbyRC]Gk@LA"},"start_location":{"lat":1.3194837,"lng":103.8927227},"travel_mode":"WALKING"},{"distance":{"text":"50 m","value":50},"duration":{"text":"1 min","value":39},"end_location":{"lat":1.3190852,"lng":103.8931783},"html_instructions":"Turn <b>right</b> to stay on <b>Eunos Rd 8</b>","maneuver":"turn-right","polyline":{"points":"uu`G{rbyRp@IXE"},"start_location":{"lat":1.3194718,"lng":103.893102},"travel_mode":"WALKING"},{"distance":{"text":"58 m","value":58},"duration":{"text":"1 min","value":44},"end_location":{"lat":1.3185786,"lng":103.8931835},"html_instructions":"Turn <b>right</b><div style=\"font-size:0.9em\">Destination will be on the right</div>","maneuver":"turn-right","polyline":{"points":"is`GksbyRJJB@BBB@D?@?D?l@GBAJG@A"},"start_location":{"lat":1.3190852,"lng":103.8931783},"travel_mode":"WALKING"},{"distance":{"text":"39 m","value":39},"duration":{"text":"1 min","value":40},"end_location":{"lat":1.3181607,"lng":103.8931436},"html_instructions":"Take entrance <span class=\"location\">A</span>","polyline":{"points":"{m`G}pbyRJeA"},"start_location":{"lat":1.318216,"lng":103.8927883},"travel_mode":"WALKING"}],"travel_mode":"WALKING"},{"distance":{"text":"6.7 km","value":6719},"duration":{"text":"16 mins","value":960},"end_location":{"lat":1.2813386,"lng":103.8589551},"html_instructions":"Subway towards Marina Bay","polyline":{"points":"om`GcsbyRVbD|Fg@zBEhE\\nEd@vENnFGxDGnCHpBRl@Zh@`@r@hBtAvKLfAd@|Dj@fFRrBzBhGfCdH^bAxB|FpB|F|BvGvDdKfDdIDNnA`EbAdEh@bEl@~I^vHPpDj@lFhBhGrDxKL\\l@|AjAfDjAtCzAtAnCp@xB@|Dg@`KKD?xFK~BM`COrJDfIB`FDhE@nCXrD|@lI`EhFbCJHIL"},"start_location":{"lat":1.3181607,"lng":103.8931436},"transit_details":{"arrival_stop":{"location":{"lat":1.2813386,"lng":103.8589551},"name":"Bayfront"},"arrival_time":{"text":"7:56pm","time_zone":"Asia/Singapore","value":1553514971},"departure_stop":{"location":{"lat":1.3181607,"lng":103.8931436},"name":"Paya Lebar"},"departure_time":{"text":"7:40pm","time_zone":"Asia/Singapore","value":1553514011},"headsign":"Marina Bay","headway":420,"line":{"agencies":[{"name":"SMRT","phone":"011 65 1800 336 8900","url":"http://www.smrt.com.sg/"}],"color":"#f2ad27","name":"Circle Line","text_color":"#000000","vehicle":{"icon":"//maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png","name":"Subway","type":"SUBWAY"}},"num_stops":6},"travel_mode":"TRANSIT"},{"distance":{"text":"0.3 km","value":274},"duration":{"text":"4 mins","value":229},"end_location":{"lat":1.2823315,"lng":103.8599537},"html_instructions":"Walk to 10 Bayfront Ave, Singapore 018956","polyline":{"points":"kgyFo}{xRhAl@CFGEaB{@w@e@y@e@SMMIMGR]KGEGCO?M@A"},"start_location":{"lat":1.2813386,"lng":103.8589551},"steps":[{"distance":{"text":"48 m","value":48},"duration":{"text":"1 min","value":49},"end_location":{"lat":1.2809674,"lng":103.8587319},"html_instructions":"Take exit <span class=\"location\">A</span>","polyline":{"points":"kgyFo}{xRhAl@"},"start_location":{"lat":1.2813386,"lng":103.8589551},"travel_mode":"WALKING"},{"distance":{"text":"0.2 km","value":181},"duration":{"text":"2 mins","value":140},"end_location":{"lat":1.2823313,"lng":103.859564},"html_instructions":"Head <b>northeast</b> toward <b>Sheares Link</b>","polyline":{"points":"eeyFy{{xRGEaB{@w@e@y@e@SMMIMG"},"start_location":{"lat":1.2809936,"lng":103.8586944},"travel_mode":"WALKING"},{"distance":{"text":"22 m","value":22},"duration":{"text":"1 min","value":18},"end_location":{"lat":1.2822924,"lng":103.8597502},"html_instructions":"Turn <b>right</b>","maneuver":"turn-right","polyline":{"points":"qmyFga|xRR]KG"},"start_location":{"lat":1.2823313,"lng":103.859564},"travel_mode":"WALKING"},{"distance":{"text":"23 m","value":23},"duration":{"text":"1 min","value":22},"end_location":{"lat":1.2823315,"lng":103.8599537},"html_instructions":"Turn <b>left</b><div style=\"font-size:0.9em\">Destination will be on the left</div>","maneuver":"turn-left","polyline":{"points":"imyFmb|xREGCO?M@A"},"start_location":{"lat":1.2822924,"lng":103.8597502},"travel_mode":"WALKING"}],"travel_mode":"WALKING"}],"traffic_speed_entry":[],"via_waypoint":[]},"fares":"113"}]};
    }

    const setChatbotDetails = ([homeAddress, fareType, media]) => {
        console.log("CHATBOT ", homeAddress , fareType, media)
        setHomeAddress(homeAddress);
        setFareType(fareType);
        setMedia(media);
    }

    const setDate = (month, day) => {
        console.log("Setting dateee", month, day);
        setMonth(month);
        setDay(day);
    }

    useEffect( () => {
        fetchData();
    }, [homeAddress, media, month, day]);

    return (
        <UserProvider
            value={{
                data,
                refetch:fetchData,
                setChatbotDetails,
                homeAddress,
                fareType,
                media,
                month,
                day,
                setDate
            }}
        >
            <div className="page">{children}</div>
        </UserProvider>
    );
};
export default Page;
