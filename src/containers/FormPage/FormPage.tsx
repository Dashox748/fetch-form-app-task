import "./formPage.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fetchCharacterData } from "../../utils/fetch";
import {
  errorParams,
  idParams,
  LoginForm,
  starWarsData,
} from "../../utils/interfaces";
import { validate } from "../../utils/validateForm";

function FormPage() {
  const { id } = useParams<idParams>();
  const [star_wars_data, set_Star_Wars_Data] = useState<starWarsData>();
  const [errors, setErrors] = useState<errorParams>({} as errorParams);
  const [registerForm, setRegisterForm] = useState<LoginForm>({} as LoginForm);
  const [termsCheck, setTermsCheck] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrors(validate({ ...registerForm, check: termsCheck }));
    if (
      Object.values(validate({ ...registerForm, check: termsCheck })).includes(
        true
      )
    )
      return;
    axios
      .post("https://example/.", star_wars_data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    (async () => {
      const data = await fetchCharacterData(id);
      const star_wars_data = {
        name: data.name,
        created: data.created,
        vehicles: data.vehicles,
      };
      set_Star_Wars_Data(star_wars_data);
    })();
  }, []);

  return (
    <div className="form__container">
      <div className="form__container-content">
        <h1 className="register-form-title">FORMULARZ REJESTRACYJNY</h1>
        <div className="border-title"></div>
        <form onSubmit={onSubmit} className="form">
          <label className="label-main">
            Login:
            <input
              type="text"
              name="login"
              onChange={(event) =>
                setRegisterForm({ ...registerForm, login: event.target.value })
              }
            />
            <div className={errors.login ? "error" : "correct"}>
              Login nie moze byc pusty
            </div>
          </label>

          <label className="label-main">
            Hasło:
            <input
              type="password"
              name="password"
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  password: event.target.value,
                })
              }
            />
            <div className={errors.password ? "error" : "correct"}>
              Haslo jest za krotkie
            </div>
          </label>
          <label className="label-main">
            E-mail:
            <input
              type="text"
              name="email"
              onChange={(event) =>
                setRegisterForm({ ...registerForm, email: event.target.value })
              }
            />
            <div className={errors.email ? "error" : "correct"}>
              Nieprawidłowy format adresu e-mail
            </div>
          </label>
          <label className="label-main">
            Numer telefonu:
            <input
              type="text"
              name="phoneNumber"
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  phoneNumber: Number(event.target.value),
                })
              }
            />
            <div className={errors.phoneNumber ? "error" : "correct"}>
              Nieprawidłowy numer telefonu
            </div>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="checkTerms"
              onClick={() => setTermsCheck(!termsCheck)}
            />
            <span
              className={
                errors.termsCheck ? "overlay error-checkbox" : "overlay"
              }
            ></span>
            <div>
              <span>Akceptuję Regulamin </span>
              <span className={errors.termsCheck ? "error-check" : "hide"}>
                Wymagana akceptacja regulaminu
              </span>
            </div>
          </label>
          <button>zapisz</button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
