import axios,{AxiosResponse} from "axios";
import {fetchChar} from "./interfaces";

export  const metoda = async (id:any) => {
    return await axios.get <fetchChar>(`https://swapi.py4e.com/api/people/${id}/`).then((res: AxiosResponse) => res.data)
    }