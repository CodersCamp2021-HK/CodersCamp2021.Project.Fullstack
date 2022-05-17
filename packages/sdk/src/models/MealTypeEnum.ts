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

/**
 *
 * @export
 */
export const MealTypeEnum = {
  Niadanie: 'śniadanie',
  Lunch: 'lunch',
  Obiad: 'obiad',
  Kolacja: 'kolacja',
} as const;
export type MealTypeEnum = typeof MealTypeEnum[keyof typeof MealTypeEnum];

export function MealTypeEnumFromJSON(json: any): MealTypeEnum {
  return MealTypeEnumFromJSONTyped(json, false);
}

export function MealTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): MealTypeEnum {
  return json as MealTypeEnum;
}

export function MealTypeEnumToJSON(value?: MealTypeEnum | null): any {
  return value as any;
}
