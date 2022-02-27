import { createParamDecorator, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { Role } from '..';
import { JwtPayload } from '../RolesAuthGuard';

const UserId = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  const payload: JwtPayload | undefined = request.user;
  if (!payload) {
    throw new UnauthorizedException();
  }

  if (payload.role !== Role.User) {
    throw new ForbiddenException();
  }

  return payload.sub;
});

export { UserId };
