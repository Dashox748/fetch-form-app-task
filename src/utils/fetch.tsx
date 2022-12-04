import axios, { AxiosResponse } from "axios";
import { fetchChar } from "./interfaces";

export const fetchCharacterData = async (id?: string) => {
  return await axios
    .get<fetchChar>(`https://swapi.py4e.com/api/people/${id}/`)
    .then((res: AxiosResponse) => res.data);
};
