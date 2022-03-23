import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';
import _ from 'lodash';

const QueryFilters = (filters: ApiQueryOptions[]) =>
  createParamDecorator(
    (_data, context: ExecutionContext) =>
      _.pick(context.switchToHttp().getRequest().query, _.compact(_.map(filters, 'name'))),
    [
      (target: object, key: string | symbol) => {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(target, key);
        if (!propertyDescriptor) throw new Error('Invalid key of target');

        for (const filter of filters) {
          ApiQuery(filter)(target, key, propertyDescriptor);
        }
      },
    ],
  )();

export { QueryFilters };
