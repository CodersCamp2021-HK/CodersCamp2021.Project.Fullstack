import { applyDecorators, Delete, Get, HttpCode, HttpStatus, Post, Put, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import _ from 'lodash';

import { ValidationErrorDto } from '../dtos';

function pickName(
  // eslint-disable-next-line @typescript-eslint/ban-types
  type: string | Function | Type<unknown> | [Function] | undefined,
) {
  if (_.isUndefined(type)) {
    return 'entity';
  }

  if (_.isString(type)) {
    return type;
  }

  if (_.isArray(type)) {
    return type[0].name;
  }

  return type.name || 'entity';
}

type ApiOptions = Readonly<
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    response: string | Function | Type<unknown> | [Function];
  } & Partial<{
    path: string;
    name: string;
    operation: Readonly<OperationObject>;
  }>
>;

type ApiResponseOptionsBase = Omit<ApiResponseOptions, 'type' | 'headers' | 'status'>;

type ApiGetOptions = Readonly<
  ApiOptions &
    Partial<{ ok: ApiResponseOptionsBase; badRequest: ApiResponseOptionsBase; notFound: ApiResponseOptionsBase }>
>;

type ApiDeleteOptions = Readonly<
  Omit<ApiOptions, 'response'> &
    Partial<{
      noContent: ApiResponseOptionsBase;
      badRequest: ApiResponseOptionsBase;
      notFound: ApiResponseOptionsBase;
    }>
>;

type ApiListOptions = Omit<ApiGetOptions, 'notFound'>;

type ApiCreateOptions = Readonly<
  Partial<
    ApiOptions & {
      created: ApiResponseOptionsBase;
      badRequest: ApiResponseOptionsBase;
    }
  >
>;

type ApiUpdateOptions = Readonly<Partial<ApiGetOptions & { noContent: ApiResponseOptionsBase }>>;

function ApiCreate(options: ApiCreateOptions): MethodDecorator {
  const path = options.path ?? '';
  const rname = options.name ?? pickName(options.response);
  const defaultOpertion = {
    summary: `Create a new ${rname}.`,
  };

  return applyDecorators(
    ApiOperation({
      ...defaultOpertion,
      ...options.operation,
    }),
    ApiCreatedResponse({
      description: `The ${rname} has been successfully created.`,
      ...options.created,
      type: options.response,
      headers: { Location: { schema: { type: 'string' } } },
    }),
    ApiBadRequestResponse({
      description: `Parameters are not valid or they are missing.`,
      ...options.badRequest,
      type: ValidationErrorDto,
    }),
    HttpCode(HttpStatus.CREATED),
    Post(path),
  );
}

function ApiUpdate(options: ApiUpdateOptions): MethodDecorator {
  const path = options.path ?? ':id';
  const rname = options.name ?? pickName(options.response);
  const defaultOpertion = {
    summary: `Update an existing ${rname}.`,
  };

  const responseDecorators = options.response
    ? [
        ApiOkResponse({
          description: `The ${rname} has been successfully updated.`,
          ...options.ok,
          type: options.response,
        }),
        HttpCode(HttpStatus.OK),
      ]
    : [
        ApiNoContentResponse({
          description: `The ${rname} has been successfully updated.`,
          ...options.noContent,
        }),
        HttpCode(HttpStatus.NO_CONTENT),
      ];

  return applyDecorators(
    ApiOperation({
      ...defaultOpertion,
      ...options.operation,
    }),
    ApiBadRequestResponse({
      description: `Parameters are not valid or they are missing.`,
      ...options.badRequest,
      type: ValidationErrorDto,
    }),
    ApiNotFoundResponse({
      description: `${_.capitalize(rname)} does not exist.`,
      ...options.notFound,
    }),
    ...responseDecorators,
    Put(path),
  );
}

function ApiDelete(options: ApiDeleteOptions): MethodDecorator {
  const path = options.path ?? ':id';
  const rname = options.name ?? 'entity';
  const defaultOpertion = {
    summary: `Delete a ${rname}.`,
  };

  return applyDecorators(
    ApiOperation({
      ...defaultOpertion,
      ...options.operation,
    }),
    ApiNoContentResponse({
      description: `The ${rname} has been successfully deleted.`,
      ...options.noContent,
    }),
    ApiBadRequestResponse({
      description: `Parameters are not valid or they are missing.`,
      ...options.badRequest,
      type: ValidationErrorDto,
    }),
    ApiNotFoundResponse({
      description: `${_.capitalize(rname)} does not exist.`,
      ...options.notFound,
    }),
    HttpCode(HttpStatus.NO_CONTENT),
    Delete(path),
  );
}

function ApiGet(options: ApiGetOptions): MethodDecorator {
  const path = options.path ?? ':id';
  const rname = options.name ?? pickName(options.response);
  const defaultOpertion = {
    summary: `Retrive a ${rname} by id.`,
  };

  return applyDecorators(
    ApiOperation({
      ...defaultOpertion,
      ...options.operation,
    }),
    ApiOkResponse({
      description: `Successfully returned ${rname}.`,
      ...options.ok,
      type: options.response,
    }),
    ApiBadRequestResponse({
      description: `Parameters are not valid or they are missing.`,
      ...options.badRequest,
      type: ValidationErrorDto,
    }),
    ApiNotFoundResponse({
      description: `${_.capitalize(rname)} does not exist.`,
      ...options.notFound,
    }),
    HttpCode(HttpStatus.OK),
    Get(path),
  );
}

function ApiList(options: ApiListOptions): MethodDecorator {
  const path = options.path ?? '';
  const rname = options.name ?? pickName(options.response);
  const defaultOpertion = {
    summary: `Retrive a list of ${rname}.`,
  };
  return applyDecorators(
    ApiOperation({
      ...defaultOpertion,
      ...options.operation,
    }),
    ApiOkResponse({
      description: `Successfully returned list of ${rname}.`,
      ...options.ok,
      type: options.response,
    }),
    ApiBadRequestResponse({
      description: `Parameters are not valid or they are missing.`,
      ...options.badRequest,
      type: ValidationErrorDto,
    }),
    HttpCode(HttpStatus.OK),
    Get(path),
  );
}

export { ApiCreate, ApiDelete, ApiGet, ApiList, ApiUpdate };
