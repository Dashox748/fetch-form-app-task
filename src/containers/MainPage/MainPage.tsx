import "./mainPage.css"
import CharacterInfo from "../../components/CharacterInfo/CharacterInfo";
import {Link, useParams} from "react-router-dom";
import {idParams} from "../../utils/interfaces";
import {useEffect, useState} from 'react'


function MainPage() {
    const [peopleId, setPeopleId] = useState<string>("1")
    const {id} = useParams<idParams>();

    useEffect(() => {
        if (id) setPeopleId(id)
    }, [id])
    return (
        <div className="main__container">
            <div className="main__container-top">
                <span className="name">Hubert Grabke</span>
                <Link to={`/form/${peopleId}`} style={{textDecoration: "none"}}>
                    <div className="formularz">
                        <div>
                            formularz rejestracyjny
                        </div>
                    </div>
                </Link>
            </div>
            <CharacterInfo/>
            <Link to={`/people/${Number(peopleId) + 1}`}
                  style={{textDecoration: "none"}}>
                <button className="button-next">next profiles</button>
            </Link>
        </div>
    );
}


export default MainPage