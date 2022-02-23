import { createParamDecorator, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { Role } from '../Role';
import { JwtPayload } from '../RolesAuthGuard';

const PartnerId = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  const paylaod: JwtPayload | undefined = request.user;
  if (!paylaod) {
    throw new UnauthorizedException();
  }

  if (paylaod.role !== Role.Partner) {
    throw new ForbiddenException();
  }

  return paylaod.sub;
});

export { PartnerId };
