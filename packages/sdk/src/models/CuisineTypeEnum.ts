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
export enum CuisineTypeEnum {
  Amerykaska = 'amerykańska',
  Azjatycka = 'azjatycka',
  Europejska = 'europejska',
  Arabska = 'arabska',
  Chiska = 'chińska',
  Francuska = 'francuska',
  Gruziska = 'gruzińska',
  Grecka = 'grecka',
  Indyjska = 'indyjska',
  Woska = 'włoska',
  Japoska = 'japońska',
  Ydowska = 'żydowska',
  Koreaska = 'koreańska',
  Libaska = 'libańska',
  Rdziemnomorska = 'śródziemnomorska',
  Meksykanka = 'meksykanśka',
  Polska = 'polska',
  Tajska = 'tajska',
  Turecka = 'turecka',
  Wietnamska = 'wietnamska',
}

export function CuisineTypeEnumFromJSON(json: any): CuisineTypeEnum {
  return CuisineTypeEnumFromJSONTyped(json, false);
}

export function CuisineTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): CuisineTypeEnum {
  return json as CuisineTypeEnum;
}

export function CuisineTypeEnumToJSON(value?: CuisineTypeEnum | null): any {
  return value as any;
}