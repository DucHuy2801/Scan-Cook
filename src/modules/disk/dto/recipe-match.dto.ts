import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class MatchDTO {
    @ApiProperty({ type: () => [RecipeDTO] })
    @IsArray()
    recipes: RecipeDTO[]
}

export class RecipeDTO {
    @ApiProperty()
    @IsNumber()
    id: number;
}