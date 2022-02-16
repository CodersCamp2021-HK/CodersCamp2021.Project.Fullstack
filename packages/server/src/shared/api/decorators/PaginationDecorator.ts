import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const Pagination = (defaultLimit = DEFAULT_LIMIT, maxLimit = MAX_LIMIT) =>
  createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      return {
        limit: parseInt(request.query.limit, 10) || defaultLimit,
        page: parseInt(request.query.page, 10) || 1,
      };
    },
    [
      // eslint-disable-next-line @typescript-eslint/ban-types
      (target: Object, key: string | symbol) => {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(target, key);
        if (!propertyDescriptor) throw new Error('Invalid key of target');

        ApiQuery({
          name: 'page',
          schema: { default: 1, type: 'number', minimum: 1 },
          required: false,
        })(target, key, propertyDescriptor);
        ApiQuery({
          name: 'limit',
          schema: { default: defaultLimit, type: 'number', minimum: 1, maximum: maxLimit },
          required: false,
        })(target, key, propertyDescriptor);
      },
    ],
  )();

export { Pagination };
