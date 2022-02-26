import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../JwtAuthGuard';
import { Role } from '../Role';
import { REFLECTOR_ROLES_KEY, RolesAuthGuard } from '../RolesAuthGuard';

function ApiAuthentication(): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiCookieAuth('cookie'), UseGuards(JwtAuthGuard));
}
function ApiAuthorization(...roles: Role[]): ClassDecorator & MethodDecorator {
  return applyDecorators(
    ApiCookieAuth('cookie'),
    SetMetadata(REFLECTOR_ROLES_KEY, roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesAuthGuard),
  );
}

export { ApiAuthentication, ApiAuthorization };
