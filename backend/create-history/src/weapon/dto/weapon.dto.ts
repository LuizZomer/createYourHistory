import { IsInt, IsString } from "class-validator";

export class WeaponDto {
    @IsInt()
    id: number

    @IsInt()
    name: string

    @IsString()
    power: string;

    @IsString()
    description: string;

    @IsInt()
    characterId?: number
}
