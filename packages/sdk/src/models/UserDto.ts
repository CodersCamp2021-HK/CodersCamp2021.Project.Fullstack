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
import {
  FavouriteDishDto,
  FavouriteDishDtoFromJSON,
  FavouriteDishDtoFromJSONTyped,
  FavouriteDishDtoToJSON,
} from './FavouriteDishDto';
import {
  FavouriteRestaurantDto,
  FavouriteRestaurantDtoFromJSON,
  FavouriteRestaurantDtoFromJSONTyped,
  FavouriteRestaurantDtoToJSON,
} from './FavouriteRestaurantDto';

/**
 *
 * @export
 * @interface UserDto
 */
export interface UserDto {
  /**
   *
   * @type {string}
   * @memberof UserDto
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof UserDto
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof UserDto
   */
  surname?: string;
  /**
   *
   * @type {string}
   * @memberof UserDto
   */
  phoneNumber?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof UserDto
   */
  addressId?: Array<string>;
  /**
   *
   * @type {Array<FavouriteRestaurantDto>}
   * @memberof UserDto
   */
  favouriteRestaurants: Array<FavouriteRestaurantDto>;
  /**
   *
   * @type {Array<FavouriteDishDto>}
   * @memberof UserDto
   */
  favouriteDishes: Array<FavouriteDishDto>;
  /**
   *
   * @type {Array<string>}
   * @memberof UserDto
   */
  orders: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof UserDto
   */
  profileCompleted: boolean;
}

export function UserDtoFromJSON(json: any): UserDto {
  return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    name: !exists(json, 'name') ? undefined : json['name'],
    surname: !exists(json, 'surname') ? undefined : json['surname'],
    phoneNumber: !exists(json, 'phoneNumber') ? undefined : json['phoneNumber'],
    addressId: !exists(json, 'addressId') ? undefined : json['addressId'],
    favouriteRestaurants: (json['favouriteRestaurants'] as Array<any>).map(FavouriteRestaurantDtoFromJSON),
    favouriteDishes: (json['favouriteDishes'] as Array<any>).map(FavouriteDishDtoFromJSON),
    orders: json['orders'],
    profileCompleted: json['profileCompleted'],
  };
}

export function UserDtoToJSON(value?: UserDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    surname: value.surname,
    phoneNumber: value.phoneNumber,
    addressId: value.addressId,
    favouriteRestaurants: (value.favouriteRestaurants as Array<any>).map(FavouriteRestaurantDtoToJSON),
    favouriteDishes: (value.favouriteDishes as Array<any>).map(FavouriteDishDtoToJSON),
    orders: value.orders,
    profileCompleted: value.profileCompleted,
  };
}
