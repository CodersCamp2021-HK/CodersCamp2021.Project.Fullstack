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
  AddressDto,
  AddressDtoFromJSON,
  AddressDtoToJSON,
  AddressListDto,
  AddressListDtoFromJSON,
  AddressListDtoToJSON,
  CreateAddressDto,
  CreateAddressDtoFromJSON,
  CreateAddressDtoToJSON,
  DefaultResponseDto,
  DefaultResponseDtoFromJSON,
  DefaultResponseDtoToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface PartnersAddressesApiCreateRequest {
  createAddressDto: CreateAddressDto;
}

export interface PartnersAddressesApiFindByIdRequest {
  id: string;
}

export interface PartnersAddressesApiListRequest {
  page?: number;
  limit?: number;
}

export interface PartnersAddressesApiRemoveAddressRequest {
  id: string;
}

/**
 *
 */
export class PartnersAddressesApi extends runtime.BaseAPI {
  /**
   * Create a new address.
   */
  async createRaw(
    requestParameters: PartnersAddressesApiCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<AddressDto>> {
    if (requestParameters.createAddressDto === null || requestParameters.createAddressDto === undefined) {
      throw new runtime.RequiredError(
        'createAddressDto',
        'Required parameter requestParameters.createAddressDto was null or undefined when calling create.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/api/partner/addresses`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreateAddressDtoToJSON(requestParameters.createAddressDto),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AddressDtoFromJSON(jsonValue));
  }

  /**
   * Create a new address.
   */
  async create(
    requestParameters: PartnersAddressesApiCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<AddressDto> {
    const response = await this.createRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a address by id.
   */
  async findByIdRaw(
    requestParameters: PartnersAddressesApiFindByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<AddressDto>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling findById.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/partner/addresses/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AddressDtoFromJSON(jsonValue));
  }

  /**
   * Retrieve a address by id.
   */
  async findById(
    requestParameters: PartnersAddressesApiFindByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<AddressDto> {
    const response = await this.findByIdRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a list of addresses.
   */
  async listRaw(
    requestParameters: PartnersAddressesApiListRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<AddressListDto>> {
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
        path: `/api/partner/addresses`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AddressListDtoFromJSON(jsonValue));
  }

  /**
   * Retrieve a list of addresses.
   */
  async list(
    requestParameters: PartnersAddressesApiListRequest = {},
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<AddressListDto> {
    const response = await this.listRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing address.
   */
  async removeAddressRaw(
    requestParameters: PartnersAddressesApiRemoveAddressRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling removeAddress.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/partner/addresses/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update an existing address.
   */
  async removeAddress(
    requestParameters: PartnersAddressesApiRemoveAddressRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction,
  ): Promise<void> {
    await this.removeAddressRaw(requestParameters, initOverrides);
  }
}
