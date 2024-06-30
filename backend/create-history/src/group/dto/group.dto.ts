import { IsInt, IsOptional, IsString } from "class-validator";

export class groupDto {
    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    name: string;

    @IsString()
    behalf: string;

    @IsString()
    description: string;
}
