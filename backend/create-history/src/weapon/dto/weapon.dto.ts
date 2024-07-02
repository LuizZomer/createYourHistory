import { IsInt, IsOptional, IsString } from "class-validator";

export class weaponDto {
    @IsInt()
    @IsOptional()
    id: number

    @IsString()
    name: string

    @IsString()
    power: string;

    @IsString()
    description: string;

    @IsInt()
    @IsOptional()
    characterId: number;

    @IsInt()
    @IsOptional()
    historyId: number;

}
