import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';

@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':id')
    getRecipeById(@Param('id') id: number) {
        return this.recipeService.getRecipeById(id)
    }
}
