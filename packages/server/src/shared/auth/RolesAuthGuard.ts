import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from './Role';

interface JwtPayload {
  sub: string;
  role: Role;
}

const REFLECTOR_ROLES_KEY = 'roles';

@Injectable()
class RolesAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(REFLECTOR_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const paylaod: JwtPayload | undefined = request.user;
    if (!paylaod) {
      return false;
    }

    return requiredRoles.includes(paylaod.role);
  }
}

export { REFLECTOR_ROLES_KEY, RolesAuthGuard };
export type { JwtPayload };
