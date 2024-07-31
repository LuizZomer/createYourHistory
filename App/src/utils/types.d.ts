export interface IHistory{
    id: number;
    name: string;
    description: string;
}

export interface ICharacter {
    id: number;
    name: string;
    description: string;
    age: number;
    personality: string;
    weapon: IWeapon;
    birthPlace: ICity;
    favoritePlace: IPlace;
    group: IGroup;
}

export interface IGroup {
    id: number
    name: string;
    behalf: string;
    description: string;
    Character: ICharacter[]
}

export interface IWeapon {
    id: number;
    name: string;
    power: string;
    description: string;
    character: ICharacter;
}

export interface IPlace{
    id: number;
    name: string;
    description: string;
    city: ICity
}

export interface ICity {
    id: number;
    name: string;
    description: string;
    place: IPlace[];
}

export interface ISelect {
    id: number;
    name: string;
}