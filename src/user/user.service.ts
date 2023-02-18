import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  };

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }


}