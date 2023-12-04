import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';

@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Post('/recognition')
    @ApiProperty()
    recogniteRecipe(@Body() image: string) {
        return {
            "recipes": [
                {
                  "id": "string",
                  "name": "string",
                  "confident": 0
                }
            ]
        }
    }

    @Get(':id')
    getRecipeById(@Param('id') id: number) {
        return this.recipeService.getRecipeById(id)
    }
}
