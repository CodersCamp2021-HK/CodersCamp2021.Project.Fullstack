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
 * @enum {string}
 */
export enum DishTagsEnum {
  Weganska = 'wegańska',
  Wegetariaska = 'wegetariańska',
  GlutenFree = 'gluten free',
  Ostre = 'ostre',
  BardzoOstre = 'bardzo ostre',
}

export function DishTagsEnumFromJSON(json: any): DishTagsEnum {
  return DishTagsEnumFromJSONTyped(json, false);
}

export function DishTagsEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): DishTagsEnum {
  return json as DishTagsEnum;
}

export function DishTagsEnumToJSON(value?: DishTagsEnum | null): any {
  return value as any;
}
