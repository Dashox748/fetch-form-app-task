import { errorParams, LoginForm } from "./interfaces";

export const isValidEmail = (email: string) => /\S+@\S+.\S+/.test(email);

export const validate = (form: LoginForm) => {
  let tempErrors: errorParams = {} as errorParams;
  tempErrors.login = form?.login ? form?.login.trim().length === 0 : true;
  tempErrors.password = form?.password? form?.password.trim().length <= 4: true;
  tempErrors.email = form?.email ? !isValidEmail(form?.email) : true;
  tempErrors.phoneNumber = form?.phoneNumber? form.phoneNumber.toString().length !== 9: true;
  tempErrors.termsCheck = !form?.check;
  return tempErrors;
};
