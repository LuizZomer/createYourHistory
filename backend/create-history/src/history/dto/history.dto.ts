import { IsInt, IsOptional, IsString } from "class-validator";

export class historyDto {
    
    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
