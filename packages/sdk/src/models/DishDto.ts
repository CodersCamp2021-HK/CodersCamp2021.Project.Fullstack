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
 * @interface DishDto
 */
export interface DishDto {
  /**
   *
   * @type {string}
   * @memberof DishDto
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof DishDto
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof DishDto
   */
  photo?: string;
  /**
   *
   * @type {Array<MealTypeEnum>}
   * @memberof DishDto
   */
  mealType?: Array<MealTypeEnum>;
  /**
   *
   * @type {string}
   * @memberof DishDto
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof DishDto
   */
  price: number;
  /**
   *
   * @type {Array<DishTagsEnum>}
   * @memberof DishDto
   */
  tags: Array<DishTagsEnum>;
  /**
   *
   * @type {Array<IngredientDto>}
   * @memberof DishDto
   */
  ingredients: Array<IngredientDto>;
  /**
   *
   * @type {Array<AllergensEnum>}
   * @memberof DishDto
   */
  allergens: Array<AllergensEnum>;
  /**
   *
   * @type {number}
   * @memberof DishDto
   */
  portionWeight: number;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof DishDto
   */
  calories: NutritionalValueDto;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof DishDto
   */
  fats: NutritionalValueDto;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof DishDto
   */
  proteins: NutritionalValueDto;
  /**
   *
   * @type {NutritionalValueDto}
   * @memberof DishDto
   */
  carbohydrates: NutritionalValueDto;
  /**
   *
   * @type {string}
   * @memberof DishDto
   */
  restaurant: string;
}

export function DishDtoFromJSON(json: any): DishDto {
  return DishDtoFromJSONTyped(json, false);
}

export function DishDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DishDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    name: json['name'],
    photo: !exists(json, 'photo') ? undefined : json['photo'],
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
    restaurant: json['restaurant'],
  };
}

export function DishDtoToJSON(value?: DishDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    photo: value.photo,
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
    restaurant: value.restaurant,
  };
}
