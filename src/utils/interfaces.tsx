export interface fetchChar {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[],
    vehicles: string[];
    starships: string[];
    created: string,
    edited: string,
    url: string
}

export interface  starWarsData {
    name:string;
    created:string;
    vehicles: string[];

}

export type idParams = {
    id: string
}

export interface errorParams {
    login:boolean
    password:boolean
    email:boolean
    number:boolean
    checkbox:boolean
}
