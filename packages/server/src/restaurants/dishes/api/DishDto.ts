import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiObjectIdProperty } from '../../../shared';

interface NutritionalValue {
  fats: number;
  proteins: number;
  carbohydrates: number;
}

class IngredientDto {
  @ApiProperty({ example: 'bazylia' })
  readonly name: string;

  @ApiProperty()
  readonly canBeExcluded: boolean;
}

// TODO: Add min and max length constrains when DishSchema gets finished, possibly move example to consts
class DishDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({ example: 'Chilli con carne' })
  readonly name: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty({ example: 'Składa się z soczewicy, świeżych pomidorów  i bazylii oraz kuminu' })
  readonly description: string;

  @ApiProperty({ example: ['milk', 'eggs', 'wheat'] })
  readonly allergens: string[];

  @ApiProperty()
  readonly callories: number;

  @ApiProperty({ example: { fats: 20, proteins: 16, carbohydrates: 35 } })
  readonly nutritionalValue: NutritionalValue;

  @Type(() => IngredientDto)
  @ApiProperty({ type: IngredientDto })
  readonly ingredients: IngredientDto[];
}

class CreateDishDto extends OmitType(DishDto, ['id'] as const) {}

class UpdateDishDto extends CreateDishDto {}

class FavouriteDishDto extends PickType(DishDto, ['id', 'name'] as const) {}

export { CreateDishDto, DishDto, FavouriteDishDto, UpdateDishDto };
