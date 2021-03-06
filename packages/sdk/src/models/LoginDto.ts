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

import { exists, mapValues } from '../runtime';
import { Role, RoleFromJSON, RoleFromJSONTyped, RoleToJSON } from './Role';

/**
 *
 * @export
 * @interface LoginDto
 */
export interface LoginDto {
  /**
   * RFC 5322 standard email format
   * @type {string}
   * @memberof LoginDto
   */
  email: string;
  /**
   *
   * @type {Role}
   * @memberof LoginDto
   */
  role: Role;
  /**
   *
   * @type {string}
   * @memberof LoginDto
   */
  password: string;
  /**
   *
   * @type {boolean}
   * @memberof LoginDto
   */
  rememberMe: boolean;
}

export function LoginDtoFromJSON(json: any): LoginDto {
  return LoginDtoFromJSONTyped(json, false);
}

export function LoginDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    email: json['email'],
    role: RoleFromJSON(json['role']),
    password: json['password'],
    rememberMe: json['rememberMe'],
  };
}

export function LoginDtoToJSON(value?: LoginDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    email: value.email,
    role: RoleToJSON(value.role),
    password: value.password,
    rememberMe: value.rememberMe,
  };
}
