import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { ImageType } from '../../../image/shared';
import { ApiImageProperty, ApiObjectIdProperty } from '../../../shared';
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

class NutritionalValueDto {
  @ApiProperty({ minimum: 0 })
  readonly per100g: number;

  @ApiProperty({ minimum: 0 })
  readonly perPortion: number;
}

@Exclude()
class DishDto {
  @Expose()
  @ApiObjectIdProperty()
  readonly id: string;

  @Expose()
  @ApiProperty({
    minLength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxLength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
    example: 'Danie 1',
  })
  readonly name: string;

  @Expose()
  @ApiImageProperty(ImageType.DishPhoto)
  readonly photo: string;

  @Expose()
  @ApiProperty({
    required: false,
    enum: MealType,
    enumName: 'MealTypeEnum',
    isArray: true,
    example: ['lunch', 'obiad'],
  })
  readonly mealType: MealType[];

  @Expose()
  @ApiPropertyOptional({
    example: 'Opis dania',
  })
  readonly description: string;

  @Expose()
  @ApiProperty({ example: 2350 })
  readonly price: number;

  @Expose()
  @ApiProperty({
    enum: DishTags,
    enumName: 'DishTagsEnum',
    isArray: true,
    example: ['ostre', 'gluten free'],
    default: [],
  })
  readonly tags: DishTags[];

  @Expose()
  @Type(() => IngredientDto)
  @ApiProperty({
    type: [IngredientDto],
    example: [],
    default: [],
  })
  readonly ingredients: IngredientDto[];

  @Expose()
  @ApiProperty({
    enum: Allergens,
    enumName: 'AllergensEnum',
    isArray: true,
    example: ['orzechy'],
    default: [],
  })
  readonly allergens: Allergens[];

  @Expose()
  @ApiProperty({ minimum: DISH_CONSTANTS.DISH_NUMBER.MIN })
  readonly portionWeight: number;

  @Expose()
  @Type(() => NutritionalValueDto)
  @ApiProperty({
    type: NutritionalValueDto,
  })
  readonly calories: NutritionalValueDto;

  @Expose()
  @Type(() => NutritionalValueDto)
  @ApiProperty({
    type: NutritionalValueDto,
  })
  readonly fats: NutritionalValueDto;

  @Expose()
  @Type(() => NutritionalValueDto)
  @ApiProperty({
    type: NutritionalValueDto,
  })
  readonly proteins: NutritionalValueDto;

  @Expose()
  @Type(() => NutritionalValueDto)
  @ApiProperty({
    type: NutritionalValueDto,
  })
  readonly carbohydrates: NutritionalValueDto;

  @Expose()
  @Type(() => String)
  @ApiObjectIdProperty()
  readonly restaurant: string;
}

class CreateDishDto extends OmitType(DishDto, ['id', 'restaurant', 'photo'] as const) {}

class UpdateDishDto extends CreateDishDto {}

export { CreateDishDto, DishDto, UpdateDishDto };
