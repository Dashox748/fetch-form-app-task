import "./characterInfo.css"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {fetchCharacterData} from "../../utils/fetch";
import {fetchChar, idParams} from "../../utils/interfaces";
import Fav from "./fav.png"

function CharacterInfo() {
    const {id} = useParams<idParams>();
    const [characterInfo, setCharacterInfo] = useState<fetchChar>({} as fetchChar)

    useEffect(() => {
        (async () => {
            if (id) setCharacterInfo(await fetchCharacterData(id))
        })();
    }, [id])

    return (
        <div className="character__container">
            <div className="img-holder">
                <img className="img-main" src="https://picsum.photos/534/383"/>
                <div className="character__container-name">
                    <h1 className="char-name">{characterInfo.name}</h1>
                    <div className="icons">
                        <img className="fav" src={Fav}/>
                        <span className="check">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50%" cy="50%" r="50" fill="#19940E">
                                </circle>
                                <line x1="75" y1="38" x2="40" y2="70" stroke="#bfb9b9" strokeWidth="12"
                                      strokeLinecap="round"/>
                                <line x1="25" y1="52" x2="40" y2="70" stroke="#bfb9b9 " strokeWidth="12"
                                      strokeLinecap="round"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className="character-info">
                <p>year of birth: <span style={{fontWeight: "500"}}>{characterInfo.birth_year}</span></p>
                <p>eye color: <span style={{fontWeight: "500"}}>{characterInfo.eye_color}</span></p>
            </div>
        </div>
    );
}


export default CharacterInfo