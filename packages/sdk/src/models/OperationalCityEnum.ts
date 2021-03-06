/* tslint:disable */
/* eslint-disable */
/**
 * JeszCoChcesz API 馃嵅馃崫馃崪
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
export const OperationalCityEnum = {
  Biaystok: 'Bia艂ystok',
  Bydgoszcz: 'Bydgoszcz',
  Gdask: 'Gda艅sk',
  GorzwWielkopolski: 'Gorz贸w Wielkopolski',
  Katowice: 'Katowice',
  Kielce: 'Kielce',
  Krakw: 'Krak贸w',
  Lublin: 'Lublin',
  D: '艁贸d藕',
  Olsztyn: 'Olsztyn',
  Opole: 'Opole',
  Pozna: 'Pozna艅',
  Rzeszw: 'Rzesz贸w',
  Szczecin: 'Szczecin',
  Toru: 'Toru艅',
  Warszawa: 'Warszawa',
  Wrocaw: 'Wroc艂aw',
  ZielonaGra: 'Zielona G贸ra',
} as const;
export type OperationalCityEnum = typeof OperationalCityEnum[keyof typeof OperationalCityEnum];

export function OperationalCityEnumFromJSON(json: any): OperationalCityEnum {
  return OperationalCityEnumFromJSONTyped(json, false);
}

export function OperationalCityEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): OperationalCityEnum {
  return json as OperationalCityEnum;
}

export function OperationalCityEnumToJSON(value?: OperationalCityEnum | null): any {
  return value as any;
}
