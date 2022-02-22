import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../shared';
import { UsersController } from '../api';
import { User, UserDocument } from '../database';

class ListUsersHandler implements Handler<PaginationQuery, Paginated<User>> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: PaginationQuery): Promise<Paginated<User>> {
    const offset = (req.page - 1) * req.limit;
    const usersDocsQuery = this.userModel.find().skip(offset).limit(req.limit);
    const countQuery = this.userModel.countDocuments();
    const [usersDocs, count] = await Promise.all([usersDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(User, usersDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListUsersHandler };
