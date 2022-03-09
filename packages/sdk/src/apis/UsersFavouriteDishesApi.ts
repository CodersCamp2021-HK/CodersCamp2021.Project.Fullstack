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

import * as runtime from '../runtime';
import {
  DefaultResponseDto,
  DefaultResponseDtoFromJSON,
  DefaultResponseDtoToJSON,
  FavouriteDishListDto,
  FavouriteDishListDtoFromJSON,
  FavouriteDishListDtoToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface UsersFavouriteDishesApiListRequest {
  page?: number;
  limit?: number;
}

/**
 *
 */
export class UsersFavouriteDishesApi extends runtime.BaseAPI {
  /**
   * Retrive a list of dishes.
   */
  async listRaw(
    requestParameters: UsersFavouriteDishesApiListRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<FavouriteDishListDto>> {
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.limit !== undefined) {
      queryParameters['limit'] = requestParameters.limit;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/users/favourite/dishes`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => FavouriteDishListDtoFromJSON(jsonValue));
  }

  /**
   * Retrive a list of dishes.
   */
  async list(
    requestParameters: UsersFavouriteDishesApiListRequest = {},
    initOverrides?: RequestInit,
  ): Promise<FavouriteDishListDto> {
    const response = await this.listRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
