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
export enum AllergensEnum {
  Gluten = 'gluten',
  Skorupiaki = 'skorupiaki',
  Jaja = 'jaja',
  Ryby = 'ryby',
  Orzechy = 'orzechy',
  Soja = 'soja',
  Mleko = 'mleko',
  Seler = 'seler',
  Gorczyca = 'gorczyca',
  NasionaSezamu = 'nasiona sezamu',
  DwutlenekSiarki = 'dwutlenek siarki',
  Ubin = 'łubin',
  Miczaki = 'mięczaki',
}

export function AllergensEnumFromJSON(json: any): AllergensEnum {
  return AllergensEnumFromJSONTyped(json, false);
}

export function AllergensEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllergensEnum {
  return json as AllergensEnum;
}

export function AllergensEnumToJSON(value?: AllergensEnum | null): any {
  return value as any;
}
