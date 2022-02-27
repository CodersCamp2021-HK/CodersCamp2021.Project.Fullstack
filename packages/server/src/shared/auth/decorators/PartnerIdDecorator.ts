import { createParamDecorator, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { Role } from '../Role';
import { JwtPayload } from '../RolesAuthGuard';

const PartnerId = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  const payload: JwtPayload | undefined = request.user;
  if (!payload) {
    throw new UnauthorizedException();
  }

  if (payload.role !== Role.Partner) {
    throw new ForbiddenException();
  }

  return payload.sub;
});

export { PartnerId };
