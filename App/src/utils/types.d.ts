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
