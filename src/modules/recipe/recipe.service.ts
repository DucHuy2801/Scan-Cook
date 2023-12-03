import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entity/recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDTO } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>
    ) {}

    async createRecipe(body: CreateRecipeDTO) {
        const { name, image } = body;
        try {
            return this.recipeRepository.save({
                name, image
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getRecipeById(id: number): Promise<Recipe> {
        const recipe = await this.recipeRepository.findOne({
            where: {id: id}
        })
        return recipe
    }
}
