/* tslint:disable */
/* eslint-disable */
/**
 * JeszCoChcesz API 🍲🍝🍜
 * JeszCoChcesz is an online food delivery system connecting restaurants with health-conscious users.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import { AllergensEnum, AllergensEnumFromJSON, AllergensEnumFromJSONTyped, AllergensEnumToJSON } from './AllergensEnum';
import { DishTagsEnum, DishTagsEnumFromJSON, DishTagsEnumFromJSONTyped, DishTagsEnumToJSON } from './DishTagsEnum';
import { IngredientDto, IngredientDtoFromJSON, IngredientDtoFromJSONTyped, IngredientDtoToJSON } from './IngredientDto';
import { MealTypeEnum, MealTypeEnumFromJSON, MealTypeEnumFromJSONTyped, MealTypeEnumToJSON } from './MealTypeEnum';
import {
  NutritionalValueDto,
  NutritionalValueDtoFromJSON,
  NutritionalValueDtoFromJSONTyped,
  NutritionalValueDtoToJSON,
} from './NutritionalValueDto';

/**
 *
 * @export
 * @interface CreateDishDto
 */
export interface CreateDishDto {
  /**
   *
   * @type {string}
   * @memberof CreateDishDto
   */
  name: string;
  /**
   *
   * @type {Array<MealTypeEnum>}
   * @memberof CreateDishDto
   */
  mealType?: Array<MealTypeEnum>;
  /**
   *
   * @type {string}
   * @memberof CreateDishDto
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof CreateDishDto
   */
  price: number;
  /**
   *
   * @type {Array<DishTagsEnum>}
   * @memberof CreateDishDto
   */
  tags: Array<DishTagsEnum>;
  /**
   *
   * @type {Array<IngredientDto>}
   * @memberof CreateDishDto
   */
  ingredients: Array<IngredientDto>;
  /**
   *
   * @type {Array<AllergensEnum>}
   * @memberof CreateDishDto
   */
  allergens: Array<AllergensEnum>;
  /**
   *
   * @type {number}
   * @memberof CreateDishDto
   */
  portionWeight: number;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof CreateDishDto
   */
  calories: NutritionalValueDto;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof CreateDishDto
   */
  fats: NutritionalValueDto;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof CreateDishDto
   */
  proteins: NutritionalValueDto;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof CreateDishDto
   */
  carbohydrates: NutritionalValueDto;
}

export function CreateDishDtoFromJSON(json: any): CreateDishDto {
  return CreateDishDtoFromJSONTyped(json, false);
}

export function CreateDishDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateDishDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
    mealType: !exists(json, 'mealType') ? undefined : (json['mealType'] as Array<any>).map(MealTypeEnumFromJSON),
    description: !exists(json, 'description') ? undefined : json['description'],
    price: json['price'],
    tags: (json['tags'] as Array<any>).map(DishTagsEnumFromJSON),
    ingredients: (json['ingredients'] as Array<any>).map(IngredientDtoFromJSON),
    allergens: (json['allergens'] as Array<any>).map(AllergensEnumFromJSON),
    portionWeight: json['portionWeight'],
    calories: NutritionalValueDtoFromJSON(json['calories']),
    fats: NutritionalValueDtoFromJSON(json['fats']),
    proteins: NutritionalValueDtoFromJSON(json['proteins']),
    carbohydrates: NutritionalValueDtoFromJSON(json['carbohydrates']),
  };
}

export function CreateDishDtoToJSON(value?: CreateDishDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    mealType: value.mealType === undefined ? undefined : (value.mealType as Array<any>).map(MealTypeEnumToJSON),
    description: value.description,
    price: value.price,
    tags: (value.tags as Array<any>).map(DishTagsEnumToJSON),
    ingredients: (value.ingredients as Array<any>).map(IngredientDtoToJSON),
    allergens: (value.allergens as Array<any>).map(AllergensEnumToJSON),
    portionWeight: value.portionWeight,
    calories: NutritionalValueDtoToJSON(value.calories),
    fats: NutritionalValueDtoToJSON(value.fats),
    proteins: NutritionalValueDtoToJSON(value.proteins),
    carbohydrates: NutritionalValueDtoToJSON(value.carbohydrates),
  };
}
