import { IsOptional, IsString } from "class-validator";

export class SearchDiskDTO {
    @IsString()
    @IsOptional()
    query: string;
}