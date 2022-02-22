import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiController,
  ApiList,
  ApiObjectIdParam,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Url,
} from '../../shared';
import { ListUsersHandler } from '../domain';
import { UserListDto } from './UserListDto';

@ApiController({ path: 'users', name: 'Users', description: 'Operations about users' })
class UsersController {
  constructor(private readonly listArticlesHandler: ListUsersHandler) {}

  @ApiObjectIdParam()
  @ApiList({ name: 'users', response: UserListDto, link: true })
  async list(@Pagination() pagination: PaginationQuery, @Res({ passthrough: true }) resp: Response, @Url() url: URL) {
    const paginatedUsers = await this.listArticlesHandler.exec(pagination);
    resp.setHeader('Link', createPaginationLink(url, paginatedUsers.pages));
    return plainToInstance(UserListDto, paginatedUsers);
  }
}

export { UsersController };
