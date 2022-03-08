/* tslint:disable */
/* eslint-disable */
/**
 * App example
 * The app API description
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import { AddressDto, AddressDtoFromJSON, AddressDtoFromJSONTyped, AddressDtoToJSON } from './AddressDto';
import {
  CuisineTypeEnum,
  CuisineTypeEnumFromJSON,
  CuisineTypeEnumFromJSONTyped,
  CuisineTypeEnumToJSON,
} from './CuisineTypeEnum';
import {
  RestaurantTagEnum,
  RestaurantTagEnumFromJSON,
  RestaurantTagEnumFromJSONTyped,
  RestaurantTagEnumToJSON,
} from './RestaurantTagEnum';

/**
 *
 * @export
 * @interface RestaurantDto
 */
export interface RestaurantDto {
  /**
   *
   * @type {string}
   * @memberof RestaurantDto
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof RestaurantDto
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof RestaurantDto
   */
  description: string;
  /**
   *
   * @type {Array<CuisineTypeEnum>}
   * @memberof RestaurantDto
   */
  cuisineType: Array<CuisineTypeEnum>;
  /**
   *
   * @type {Array<RestaurantTagEnum>}
   * @memberof RestaurantDto
   */
  tags: Array<RestaurantTagEnum>;
  /**
   *
   * @type {Array<AddressDto>}
   * @memberof RestaurantDto
   */
  addressId: Array<AddressDto>;
}

export function RestaurantDtoFromJSON(json: any): RestaurantDto {
  return RestaurantDtoFromJSONTyped(json, false);
}

export function RestaurantDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RestaurantDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    name: json['name'],
    description: json['description'],
    cuisineType: (json['cuisineType'] as Array<any>).map(CuisineTypeEnumFromJSON),
    tags: (json['tags'] as Array<any>).map(RestaurantTagEnumFromJSON),
    addressId: (json['addressId'] as Array<any>).map(AddressDtoFromJSON),
  };
}

export function RestaurantDtoToJSON(value?: RestaurantDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    description: value.description,
    cuisineType: (value.cuisineType as Array<any>).map(CuisineTypeEnumToJSON),
    tags: (value.tags as Array<any>).map(RestaurantTagEnumToJSON),
    addressId: (value.addressId as Array<any>).map(AddressDtoToJSON),
  };
}
