import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { URL } from 'url';

const Url = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
});

export { Url };
