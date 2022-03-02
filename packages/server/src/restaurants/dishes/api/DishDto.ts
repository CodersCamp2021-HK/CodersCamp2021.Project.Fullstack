import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiObjectIdProperty } from '../../../shared';
import { Allergens, DISH_CONSTANTS, DishTags, MealType } from '../database';

class IngredientDto {
  @ApiProperty({
    minLength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxLength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
    example: 'bazylia',
  })
  readonly name: string;

  @ApiProperty({ default: false })
  readonly canBeExcluded: boolean;
}

// TODO: Add photo property
class DishDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({
    minLength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxLength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
    example: 'Danie 1',
  })
  readonly name: string;

  @ApiProperty({
    required: false,
    enum: MealType,
    enumName: 'MealTypeEnum',
    isArray: true,
    example: ['lunch', 'obiad'],
  })
  readonly mealType: MealType[];

  @ApiProperty({
    required: false,
    example: 'Opis dania',
  })
  readonly description: string;

  @ApiProperty({ example: 2350 })
  readonly price: number;

  @ApiProperty({
    required: false,
    enum: DishTags,
    enumName: 'DishTagsEnum',
    isArray: true,
    example: ['ostre', 'gluten free'],
  })
  readonly tags: DishTags[];

  @Type(() => IngredientDto)
  @ApiProperty({
    required: false,
    type: [IngredientDto],
  })
  readonly ingredients: IngredientDto[];

  @ApiProperty({
    required: false,
    enum: Allergens,
    enumName: 'AllergensEnum',
    isArray: true,
    example: ['orzechy'],
  })
  readonly allergens: Allergens[];

  @ApiProperty({ minimum: DISH_CONSTANTS.DISH_NUMBER.MIN })
  readonly portionWeight: number;

  @ApiProperty({
    minimum: 0,
    example: 100,
  })
  readonly calories: number;

  @ApiProperty({
    minimum: 0,
    example: 20,
  })
  readonly fats: number;

  @ApiProperty({
    minimum: 0,
    example: 20,
  })
  readonly proteins: number;

  @ApiProperty({
    minimum: 0,
    example: 20,
  })
  readonly carbohydrates: number;
}

class CreateDishDto extends OmitType(DishDto, ['id'] as const) {}

class UpdateDishDto extends CreateDishDto {}

class FavouriteDishDto extends PickType(DishDto, ['id', 'name'] as const) {}

class ShortenedDishDto extends OmitType(DishDto, [
  'allergens',
  'fats',
  'proteins',
  'carbohydrates',
  'ingredients',
] as const) {}

export { CreateDishDto, DishDto, FavouriteDishDto, ShortenedDishDto, UpdateDishDto };
