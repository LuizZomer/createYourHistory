import { IsInt, IsOptional, IsString } from "class-validator";

export class placeDto {
    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @IsOptional()
    cityId: number

    @IsInt()
    @IsOptional()
    historyId: number
}
