import { IsInt, IsOptional, IsString } from "class-validator";

export class CharacterDto {
    @IsInt()
    @IsOptional()
    id: number

    @IsString()
    name: string;

    @IsInt()
    @IsOptional()
    weaponId: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsOptional()
    birthPlace: number;

    @IsString()
    personality: string;

    @IsInt()
    @IsOptional()
    relation: number

    @IsInt()
    @IsOptional()
    groupId: number

    @IsInt()
    @IsOptional()
    favoritePlaceId: number
}