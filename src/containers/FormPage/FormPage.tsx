import "./formPage.css"
import {FormEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {metoda} from "../../utils/fetch";
import {errorParams, idParams, starWarsData} from "../../utils/interfaces";


function FormPage() {
    const {id} = useParams<idParams>()
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"]
    const [star_wars_data, set_Star_Wars_Data] = useState<starWarsData>()
    const [errors, setErrors] = useState<errorParams>({} as errorParams)
    const ref = useRef() as any;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = ref.current
        let tempErrors: errorParams = {} as errorParams
        form[`login`].value.length === 0 ? tempErrors.login = true : tempErrors.login = false
        form[`password`].value.length <= 4 ? tempErrors.password = true : tempErrors.password = false
        !regex.test(form[`email`].value) ? tempErrors.email = true : tempErrors.email = false
        form[`number`].value.length !== 9 ? tempErrors.number = true : tempErrors.number = false
        !form[`check`].checked ? tempErrors.checkbox = true : tempErrors.checkbox = false
        setErrors(tempErrors)
        if (Object.values(tempErrors).includes(true)) return
        axios.post("https://example/.", star_wars_data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        (async () => {
            const data = await metoda(id)
            const star_wars_data = {
                name: data.name,
                created: data.created,
                vehicles: data.vehicles
            }
            set_Star_Wars_Data(star_wars_data)
        })();
    }, [])
    return (
        <div className="form__container">
            <div className="form__container-content">
                <h1 className="register-form-title">FORMULARZ REJESTRACYJNY</h1>
                <div className="border-title"></div>
                <form onSubmit={onSubmit} className="form" ref={ref}>
                    <label className="label-main">
                        Login:
                        <input type="text" name="login"/>
                        <div className={errors.login ? "error" : "correct"}>Login nie moze byc pusty</div>
                    </label>

                    <label className="label-main">
                        Hasło:
                        <input type="password" name="password"/>
                        <div className={errors.password ? "error" : "correct"}>Haslo jest za krotkie</div>
                    </label>
                    <label className="label-main">
                        E-mail:
                        <input type="text" name="email"/>
                        <div className={errors.email ? "error" : "correct"}>Nieprawidłowy format adresu e-mail</div>
                    </label>
                    <label className="label-main">
                        Numer telefonu:
                        <input type="text" name="number"
                               onKeyDown={(event: any) => !numbers.includes(event.key) && event.preventDefault()}/>
                        <div className={errors.number ? "error" : "correct"}>Nieprawidłowy numer telefonu</div>
                    </label>

                    <label className="checkbox">
                        <input type="checkbox" name="check"/>
                        <span className={errors.checkbox ? "overlay error-checkbox" : "overlay"}>
                        </span>
                        <div><span>Akceptuję Regulamin </span><span
                            className={errors.checkbox ? "error-check" : "hide"}> Wymagana akceptacja regulaminu</span>
                        </div>
                    </label>
                    <button>zapisz</button>
                </form>
            </div>
        </div>
    )
}

export default FormPage


