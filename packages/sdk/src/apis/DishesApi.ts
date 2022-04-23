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
  DishDto,
  DishDtoFromJSON,
  DishDtoToJSON,
  DishListDto,
  DishListDtoFromJSON,
  DishListDtoToJSON,
  OperationalCityEnum,
  OperationalCityEnumFromJSON,
  OperationalCityEnumToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface DishesApiFindDishByIdRequest {
  id: string;
}

export interface DishesApiListAllDishesRequest {
  city?: OperationalCityEnum;
  mealType?: Array<string>;
  tags?: Array<string>;
  page?: number;
  limit?: number;
}

/**
 *
 */
export class DishesApi extends runtime.BaseAPI {
  /**
   * Retrieve a dish by id.
   */
  async findDishByIdRaw(
    requestParameters: DishesApiFindDishByIdRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<DishDto>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling findDishById.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/dishes/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => DishDtoFromJSON(jsonValue));
  }

  /**
   * Retrieve a dish by id.
   */
  async findDishById(requestParameters: DishesApiFindDishByIdRequest, initOverrides?: RequestInit): Promise<DishDto> {
    const response = await this.findDishByIdRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a list of dishes.
   */
  async listAllDishesRaw(
    requestParameters: DishesApiListAllDishesRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<DishListDto>> {
    const queryParameters: any = {};

    if (requestParameters.city !== undefined) {
      queryParameters['city'] = requestParameters.city;
    }

    if (requestParameters.mealType) {
      queryParameters['mealType'] = requestParameters.mealType;
    }

    if (requestParameters.tags) {
      queryParameters['tags'] = requestParameters.tags;
    }

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.limit !== undefined) {
      queryParameters['limit'] = requestParameters.limit;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/dishes`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => DishListDtoFromJSON(jsonValue));
  }

  /**
   * Retrieve a list of dishes.
   */
  async listAllDishes(
    requestParameters: DishesApiListAllDishesRequest = {},
    initOverrides?: RequestInit,
  ): Promise<DishListDto> {
    const response = await this.listAllDishesRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
