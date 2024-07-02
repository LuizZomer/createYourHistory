import { IsInt, IsOptional, IsString } from "class-validator";

export class relationDto {
    @IsInt()
    @IsOptional()
    id: number

    @IsString()
    relationType: string;

    @IsInt()
    characterId: number;

    @IsInt()
    relationCharacterId: number;
}
