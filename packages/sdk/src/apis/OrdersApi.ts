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
  CreateOrderDto,
  CreateOrderDtoFromJSON,
  CreateOrderDtoToJSON,
  DefaultResponseDto,
  DefaultResponseDtoFromJSON,
  DefaultResponseDtoToJSON,
  OrderDto,
  OrderDtoFromJSON,
  OrderDtoToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface CreateOrderRequest {
  createOrderDto: CreateOrderDto;
}

/**
 *
 */
export class OrdersApi extends runtime.BaseAPI {
  /**
   * Create a new order.
   */
  async createOrderRaw(
    requestParameters: CreateOrderRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<OrderDto>> {
    if (requestParameters.createOrderDto === null || requestParameters.createOrderDto === undefined) {
      throw new runtime.RequiredError(
        'createOrderDto',
        'Required parameter requestParameters.createOrderDto was null or undefined when calling createOrder.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/api/orders`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreateOrderDtoToJSON(requestParameters.createOrderDto),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrderDtoFromJSON(jsonValue));
  }

  /**
   * Create a new order.
   */
  async createOrder(requestParameters: CreateOrderRequest, initOverrides?: RequestInit): Promise<OrderDto> {
    const response = await this.createOrderRaw(requestParameters, initOverrides);
    return await response.value();
  }
}