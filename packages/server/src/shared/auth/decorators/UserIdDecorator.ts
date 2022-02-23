import { createParamDecorator, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { Role } from '..';
import { JwtPayload } from '../RolesAuthGuard';

const UserId = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  const paylaod: JwtPayload | undefined = request.user;
  if (!paylaod) {
    throw new UnauthorizedException();
  }

  if (paylaod.role !== Role.User) {
    throw new ForbiddenException();
  }

  return paylaod.sub;
});

export { UserId };
