import { IsInt, IsOptional, IsString } from "class-validator";

export class cityDto {
    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @IsOptional()
    placeId: number;

    @IsInt()
    @IsOptional()
    historyId: number
}
