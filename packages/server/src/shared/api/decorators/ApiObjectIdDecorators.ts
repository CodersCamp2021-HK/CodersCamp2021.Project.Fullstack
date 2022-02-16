import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiParamOptions, ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

const OBJECT_ID_SCHEMA = Object.freeze({
  type: 'string',
  pattern: '^[0-9a-fA-F]{24}$',
  example: '6200218668fc82e7bdf15088',
});

type ApiObjectIdParamOptions = { name?: string } & Pick<ApiParamOptions, 'description'>;

function ApiObjectIdParam({ name = 'id', ...rest }: ApiObjectIdParamOptions = {}): MethodDecorator {
  return applyDecorators(
    ApiParam({
      ...rest,
      name,
      schema: { ...OBJECT_ID_SCHEMA },
    }),
  );
}

type ApiObjectIdPropertyOptions = Pick<ApiPropertyOptions, 'description'>;

function ApiObjectIdProperty(options: ApiObjectIdPropertyOptions = {}): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      ...options,
      ...OBJECT_ID_SCHEMA,
    }),
  );
}

export { ApiObjectIdParam, ApiObjectIdProperty };
