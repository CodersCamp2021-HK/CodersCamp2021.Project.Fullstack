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

/**
 *
 * @export
 * @enum {string}
 */
export enum MealTypeEnum {
  Niadanie = 'śniadanie',
  Lunch = 'lunch',
  Obiad = 'obiad',
  Kolacja = 'kolacja',
}

export function MealTypeEnumFromJSON(json: any): MealTypeEnum {
  return MealTypeEnumFromJSONTyped(json, false);
}

export function MealTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): MealTypeEnum {
  return json as MealTypeEnum;
}

export function MealTypeEnumToJSON(value?: MealTypeEnum | null): any {
  return value as any;
}
