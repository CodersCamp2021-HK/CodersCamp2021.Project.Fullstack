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

import * as runtime from '../runtime';
import {
  DefaultResponseDto,
  DefaultResponseDtoFromJSON,
  DefaultResponseDtoToJSON,
  FavouriteDishDto,
  FavouriteDishDtoFromJSON,
  FavouriteDishDtoToJSON,
  FavouriteDishListDto,
  FavouriteDishListDtoFromJSON,
  FavouriteDishListDtoToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface UsersFavouriteDishesApiAddRequest {
  id: string;
}

export interface UsersFavouriteDishesApiListRequest {
  page?: number;
  limit?: number;
}

export interface UsersFavouriteDishesApiRemoveRequest {
  id: string;
}

/**
 *
 */
export class UsersFavouriteDishesApi extends runtime.BaseAPI {
  /**
   * Update an existing dish.
   */
  async addRaw(
    requestParameters: UsersFavouriteDishesApiAddRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<FavouriteDishDto>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling add.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/users/favourite/dishes/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => FavouriteDishDtoFromJSON(jsonValue));
  }

  /**
   * Update an existing dish.
   */
  async add(
    requestParameters: UsersFavouriteDishesApiAddRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<FavouriteDishDto> {
    const response = await this.addRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a list of dishes.
   */
  async listRaw(
    requestParameters: UsersFavouriteDishesApiListRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
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
   * Retrieve a list of dishes.
   */
  async list(
    requestParameters: UsersFavouriteDishesApiListRequest = {},
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<FavouriteDishListDto> {
    const response = await this.listRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Delete a dish.
   */
  async removeRaw(
    requestParameters: UsersFavouriteDishesApiRemoveRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling remove.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/users/favourite/dishes/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a dish.
   */
  async remove(
    requestParameters: UsersFavouriteDishesApiRemoveRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<void> {
    await this.removeRaw(requestParameters, initOverrides);
  }
}
