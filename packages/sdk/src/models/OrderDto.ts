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
import { SubOrderDto, SubOrderDtoFromJSON, SubOrderDtoFromJSONTyped, SubOrderDtoToJSON } from './SubOrderDto';

/**
 *
 * @export
 * @interface OrderDto
 */
export interface OrderDto {
  /**
   *
   * @type {string}
   * @memberof OrderDto
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof OrderDto
   */
  addressId: string;
  /**
   *
   * @type {string}
   * @memberof OrderDto
   */
  userId: string;
  /**
   *
   * @type {Date}
   * @memberof OrderDto
   */
  date: Date;
  /**
   *
   * @type {Array<SubOrderDto>}
   * @memberof OrderDto
   */
  subOrders: Array<SubOrderDto>;
  /**
   *
   * @type {string}
   * @memberof OrderDto
   */
  comment: string;
}

export function OrderDtoFromJSON(json: any): OrderDto {
  return OrderDtoFromJSONTyped(json, false);
}

export function OrderDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    addressId: json['addressId'],
    userId: json['userId'],
    date: new Date(json['date']),
    subOrders: (json['subOrders'] as Array<any>).map(SubOrderDtoFromJSON),
    comment: json['comment'],
  };
}

export function OrderDtoToJSON(value?: OrderDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    addressId: value.addressId,
    userId: value.userId,
    date: value.date.toISOString(),
    subOrders: (value.subOrders as Array<any>).map(SubOrderDtoToJSON),
    comment: value.comment,
  };
}