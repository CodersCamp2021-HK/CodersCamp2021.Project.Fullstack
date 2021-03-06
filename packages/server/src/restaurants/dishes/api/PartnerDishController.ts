import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiCreate,
  ApiDelete,
  ApiList,
  ApiObjectIdParam,
  ApiUpdate,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  ParamDishesFilter,
  PartnerId,
  Role,
  Url,
} from '../../../shared';
import { CreateDishHandler, DeleteDishHandler, DishFilters, ListDishesHandler, UpdateDishHandler } from '../domain';
import { CreateDishDto, DishDto, UpdateDishDto } from './DishDto';
import { DishListDto } from './DishListDto';

@ApiController({ path: 'partner/dishes', name: "Partner's dishes", description: "Operations on partner's dishes" })
class PartnerDishController {
  constructor(
    private readonly createDishHandler: CreateDishHandler,
    private readonly listDishesHandler: ListDishesHandler,
    private readonly updateDishHandler: UpdateDishHandler,
    private readonly deleteDishHandler: DeleteDishHandler,
  ) {}

  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  @ApiAuthorization(Role.Partner)
  async list(
    @PartnerId() restaurantId: string,
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
    @ParamDishesFilter() filters: DishFilters,
  ) {
    const paginatedDishes = await this.listDishesHandler.exec({ ...pagination, ...filters, restaurantId });
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }

  @ApiCreate({ name: 'dish', response: DishDto })
  @ApiAuthorization(Role.Partner)
  async create(
    @PartnerId() restaurant: string,
    @Body() createDishDto: CreateDishDto,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const dish = await this.createDishHandler.exec({ ...createDishDto, restaurant });
    if (!dish) return null;
    res.setHeader('Location', `${url.href}/${dish.id}`);
    return plainToInstance(DishDto, dish);
  }

  @ApiObjectIdParam()
  @ApiUpdate({ name: 'dish', response: DishDto })
  @ApiAuthorization(Role.Partner)
  async update(@PartnerId() restaurant: string, @Param('id') dishId: string, @Body() updateDishDto: UpdateDishDto) {
    const updatedDish = await this.updateDishHandler.exec({ restaurant, dishId, ...updateDishDto });
    return plainToInstance(DishDto, updatedDish);
  }

  @ApiObjectIdParam()
  @ApiDelete({ name: 'dish' })
  @ApiAuthorization(Role.Partner)
  async deleteOne(@PartnerId() restaurant: string, @Param('id') dishId: string) {
    return this.deleteDishHandler.exec({ restaurantId: restaurant, id: dishId });
  }
}

export { PartnerDishController };
