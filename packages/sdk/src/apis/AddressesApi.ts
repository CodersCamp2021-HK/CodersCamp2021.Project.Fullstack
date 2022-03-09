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
  AddressDto,
  AddressDtoFromJSON,
  AddressDtoToJSON,
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

export interface AddressesApiCreateRequest {
  createAddressDto: CreateAddressDto;
}

export interface AddressesApiFindByIdRequest {
  id: string;
}

/**
 *
 */
export class AddressesApi extends runtime.BaseAPI {
  /**
   * Create a new address.
   */
  async createRaw(
    requestParameters: AddressesApiCreateRequest,
    initOverrides?: RequestInit,
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
        path: `/api/addresses`,
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
  async create(requestParameters: AddressesApiCreateRequest, initOverrides?: RequestInit): Promise<AddressDto> {
    const response = await this.createRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrive a address by id.
   */
  async findByIdRaw(
    requestParameters: AddressesApiFindByIdRequest,
    initOverrides?: RequestInit,
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
        path: `/api/addresses/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AddressDtoFromJSON(jsonValue));
  }

  /**
   * Retrive a address by id.
   */
  async findById(requestParameters: AddressesApiFindByIdRequest, initOverrides?: RequestInit): Promise<AddressDto> {
    const response = await this.findByIdRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
