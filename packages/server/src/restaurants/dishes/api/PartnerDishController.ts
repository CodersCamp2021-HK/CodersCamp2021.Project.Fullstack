import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiCreate,
  ApiDelete,
  ApiGet,
  ApiList,
  ApiObjectIdParam,
  ApiUpdate,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  PartnerId,
  Role,
  Url,
} from '../../../shared';
import { CreateDishDto, DishDto, UpdateDishDto } from './DishDto';
import { DishListDto } from './DishListDto';

@ApiController({ path: 'partner/dishes', name: "Partner's dishes", description: "Operations on partner's dishes" })
class PartnerDishController {
  @ApiObjectIdParam()
  @ApiGet({ name: 'dish', response: DishDto })
  @ApiAuthorization(Role.Partner)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(@PartnerId() partnerId: string, @Param('id') dishId: string) {
    const dish = null; // TODO: Hook up GetDishHandler, remove eslint-disable comment above
    if (!dish) return null;
    return plainToInstance(DishDto, dish);
  }

  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  @ApiAuthorization(Role.Partner)
  async list(
    @PartnerId() partnerId: string,
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const paginatedDishes = { data: [], pages: 1 }; // TODO: Hook up ListDishesHandler
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }

  @ApiCreate({ name: 'dish', response: DishDto })
  @ApiAuthorization(Role.Partner)
  async create(
    @PartnerId() partnerId: string,
    @Body() createDishDto: CreateDishDto,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const dish = { ...createDishDto, id: '6200218668fc82e7bdf15088' }; // TODO: Hook up CreateDishHandler
    res.setHeader('Location', `${url.href}/${dish.id}`);
    return plainToInstance(DishDto, dish);
  }

  @ApiObjectIdParam()
  @ApiUpdate({ name: 'dish' })
  @ApiAuthorization(Role.Partner)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(@PartnerId() partnerId: string, @Param('id') dishId: string, @Body() updateDishDto: UpdateDishDto) {
    return null; // TODO: Hook up UpdateDishHandler, remove eslint-disable comment above
  }

  @ApiObjectIdParam()
  @ApiDelete({ name: 'dish' })
  @ApiAuthorization(Role.Partner)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteOne(@PartnerId() partnerId: string, @Param('id') dishId: string) {
    return null; // TODO: Hook up DeleteDishHandler, remove eslint-disable comment above
  }
}

export { PartnerDishController };
