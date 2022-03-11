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
  UploadedImageDto,
  UploadedImageDtoFromJSON,
  UploadedImageDtoToJSON,
  ValidationErrorDto,
  ValidationErrorDtoFromJSON,
  ValidationErrorDtoToJSON,
} from '../models';

export interface ImagesApiGetImgRequest {
  type: GetImgTypeEnum;
  id: string;
}

export interface ImagesApiUploadLogoRequest {
  file?: Blob;
}

export interface ImagesApiUploadPhotoRequest {
  dishId: string;
  file?: Blob;
}

/**
 *
 */
export class ImagesApi extends runtime.BaseAPI {
  /**
   * Retrieve a image by id.
   */
  async getImgRaw(
    requestParameters: ImagesApiGetImgRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.type === null || requestParameters.type === undefined) {
      throw new runtime.RequiredError(
        'type',
        'Required parameter requestParameters.type was null or undefined when calling getImg.',
      );
    }

    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getImg.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/img/{type}/{id}`
          .replace(`{${'type'}}`, encodeURIComponent(String(requestParameters.type)))
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Retrieve a image by id.
   */
  async getImg(requestParameters: ImagesApiGetImgRequest, initOverrides?: RequestInit): Promise<object> {
    const response = await this.getImgRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing logo.
   */
  async uploadLogoRaw(
    requestParameters: ImagesApiUploadLogoRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<UploadedImageDto>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const consumes: runtime.Consume[] = [{ contentType: 'multipart/form-data' }];
    // @ts-ignore: canConsumeForm may be unused
    const canConsumeForm = runtime.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): any };
    let useForm = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    useForm = canConsumeForm;
    if (useForm) {
      formParams = new FormData();
    } else {
      formParams = new URLSearchParams();
    }

    if (requestParameters.file !== undefined) {
      formParams.append('file', requestParameters.file as any);
    }

    const response = await this.request(
      {
        path: `/api/img/upload-restaurant`,
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: formParams,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UploadedImageDtoFromJSON(jsonValue));
  }

  /**
   * Update an existing logo.
   */
  async uploadLogo(
    requestParameters: ImagesApiUploadLogoRequest = {},
    initOverrides?: RequestInit,
  ): Promise<UploadedImageDto> {
    const response = await this.uploadLogoRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update an existing photo.
   */
  async uploadPhotoRaw(
    requestParameters: ImagesApiUploadPhotoRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<UploadedImageDto>> {
    if (requestParameters.dishId === null || requestParameters.dishId === undefined) {
      throw new runtime.RequiredError(
        'dishId',
        'Required parameter requestParameters.dishId was null or undefined when calling uploadPhoto.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const consumes: runtime.Consume[] = [{ contentType: 'multipart/form-data' }];
    // @ts-ignore: canConsumeForm may be unused
    const canConsumeForm = runtime.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): any };
    let useForm = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    useForm = canConsumeForm;
    if (useForm) {
      formParams = new FormData();
    } else {
      formParams = new URLSearchParams();
    }

    if (requestParameters.file !== undefined) {
      formParams.append('file', requestParameters.file as any);
    }

    const response = await this.request(
      {
        path: `/api/img/upload-dish/{dishId}`.replace(
          `{${'dishId'}}`,
          encodeURIComponent(String(requestParameters.dishId)),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: formParams,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UploadedImageDtoFromJSON(jsonValue));
  }

  /**
   * Update an existing photo.
   */
  async uploadPhoto(
    requestParameters: ImagesApiUploadPhotoRequest,
    initOverrides?: RequestInit,
  ): Promise<UploadedImageDto> {
    const response = await this.uploadPhotoRaw(requestParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 * @enum {string}
 */
export enum GetImgTypeEnum {
  Restaurant = 'restaurant',
  Dish = 'dish',
}
