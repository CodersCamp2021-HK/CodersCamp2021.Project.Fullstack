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
import { DishDto, DishDtoFromJSON, DishDtoFromJSONTyped, DishDtoToJSON } from './DishDto';

/**
 *
 * @export
 * @interface DishListDto
 */
export interface DishListDto {
  /**
   *
   * @type {Array<DishDto>}
   * @memberof DishListDto
   */
  data: Array<DishDto>;
  /**
   *
   * @type {number}
   * @memberof DishListDto
   */
  pages: number;
}

export function DishListDtoFromJSON(json: any): DishListDto {
  return DishListDtoFromJSONTyped(json, false);
}

export function DishListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DishListDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(DishDtoFromJSON),
    pages: json['pages'],
  };
}

export function DishListDtoToJSON(value?: DishListDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: (value.data as Array<any>).map(DishDtoToJSON),
    pages: value.pages,
  };
}
