import { ApiProperty, PickType } from '@nestjs/swagger';

import { ApiObjectIdProperty } from '../../../shared';

interface NutritionalValue {
  fats: number;
  proteins: number;
  carbohydrates: number;
}

interface Ingredient {
  name: string;
  canBeExcluded: boolean;
}

class DishDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly allergens: string[];

  @ApiProperty()
  readonly callories: number;

  @ApiProperty()
  readonly nutritionalValue: NutritionalValue;

  @ApiProperty()
  readonly ingredients: Ingredient[];
}

class FavouriteDishDto extends PickType(DishDto, ['id', 'name'] as const) {}

export { DishDto, FavouriteDishDto };
