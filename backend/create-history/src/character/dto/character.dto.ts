import { IsInt, IsString } from "class-validator";

export class CharacterDto {
    @IsInt()
    id: number

    @IsString()
    name: string;

    @IsInt()
    weapon?: number;

    @IsString()
    description: string;

    @IsInt()
    birthPlace?: number;

    @IsString()
    personality: string;

    @IsInt()
    bestFriend?: number

    @IsInt()
    enemy?: number;

    @IsInt()
    group?: number

    @IsInt()
    favoritePlace?: number
}