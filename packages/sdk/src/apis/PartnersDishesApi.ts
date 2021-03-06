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
  CreateDishDto,
  CreateDishDtoFromJSON,
  CreateDishDtoToJSON,
  DefaultResponseDto,
  DefaultResponseDtoFromJSON,
  DefaultResponseDtoToJSON,
  DishDto,
  DishDtoFromJSON,
  DishDtoToJSON,
  DishListDto,
  DishListDtoFromJSON,
  DishListDtoToJSON,
  UpdateDishDto,
  UpdateDishDtoFromJSON,
  UpdateDishDtoToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface PartnersDishesApiCreateRequest {
  createDishDto: CreateDishDto;
}

export interface PartnersDishesApiDeleteOneRequest {
  id: string;
}

export interface PartnersDishesApiListRequest {
  city?: string;
  cuisineType?: Array<string>;
  mealType?: Array<string>;
  tags?: Array<string>;
  page?: number;
  limit?: number;
}

export interface PartnersDishesApiUpdateRequest {
  id: string;
  updateDishDto: UpdateDishDto;
}

/**
 *
 */
export class PartnersDishesApi extends runtime.BaseAPI {
  /**
   * Create a new dish.
   */
  async createRaw(
    requestParameters: PartnersDishesApiCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<DishDto>> {
    if (requestParameters.createDishDto === null || requestParameters.createDishDto === undefined) {
      throw new runtime.RequiredError(
        'createDishDto',
        'Required parameter requestParameters.createDishDto was null or undefined when calling create.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/api/partner/dishes`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreateDishDtoToJSON(requestParameters.createDishDto),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => DishDtoFromJSON(jsonValue));
  }

  /**
   * Create a new dish.
   */
  async create(
    requestParameters: PartnersDishesApiCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<DishDto> {
    const response = await this.createRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Delete a dish.
   */
  async deleteOneRaw(
    requestParameters: PartnersDishesApiDeleteOneRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteOne.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/partner/dishes/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
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
  async deleteOne(
    requestParameters: PartnersDishesApiDeleteOneRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<void> {
    await this.deleteOneRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve a list of dishes.
   */
  async listRaw(
    requestParameters: PartnersDishesApiListRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<DishListDto>> {
    const queryParameters: any = {};

    if (requestParameters.city !== undefined) {
      queryParameters['city'] = requestParameters.city;
    }

    if (requestParameters.cuisineType) {
      queryParameters['cuisineType'] = requestParameters.cuisineType;
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
        path: `/api/partner/dishes`,
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
  async list(
    requestParameters: PartnersDishesApiListRequest = {},
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<DishListDto> {
    const response = await this.listRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing dish.
   */
  async updateRaw(
    requestParameters: PartnersDishesApiUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<DishDto>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling update.',
      );
    }

    if (requestParameters.updateDishDto === null || requestParameters.updateDishDto === undefined) {
      throw new runtime.RequiredError(
        'updateDishDto',
        'Required parameter requestParameters.updateDishDto was null or undefined when calling update.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/api/partner/dishes/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: UpdateDishDtoToJSON(requestParameters.updateDishDto),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => DishDtoFromJSON(jsonValue));
  }

  /**
   * Update an existing dish.
   */
  async update(
    requestParameters: PartnersDishesApiUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<DishDto> {
    const response = await this.updateRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
