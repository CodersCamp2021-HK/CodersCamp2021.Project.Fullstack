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
export enum OperationalCityEnum {
  Biaystok = 'Białystok',
  Bydgoszcz = 'Bydgoszcz',
  Gdask = 'Gdańsk',
  GorzwWielkopolski = 'Gorzów Wielkopolski',
  Katowice = 'Katowice',
  Kielce = 'Kielce',
  Krakw = 'Kraków',
  Lublin = 'Lublin',
  D = 'Łódź',
  Olsztyn = 'Olsztyn',
  Opole = 'Opole',
  Pozna = 'Poznań',
  Rzeszw = 'Rzeszów',
  Szczecin = 'Szczecin',
  Toru = 'Toruń',
  Warszawa = 'Warszawa',
  Wrocaw = 'Wrocław',
  ZielonaGra = 'Zielona Góra',
}

export function OperationalCityEnumFromJSON(json: any): OperationalCityEnum {
  return OperationalCityEnumFromJSONTyped(json, false);
}

export function OperationalCityEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): OperationalCityEnum {
  return json as OperationalCityEnum;
}

export function OperationalCityEnumToJSON(value?: OperationalCityEnum | null): any {
  return value as any;
}
