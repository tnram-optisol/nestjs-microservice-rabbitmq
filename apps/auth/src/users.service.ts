import { validate } from '@nestjs/class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './database/entities/user.entity';
import { HelperService } from './helper/helper.service';
import { CommonService } from 'y/common';
import { Role } from './database/entities/role.entity';

@Injectable()
export class UsersService {
  private helperService: HelperService = new HelperService();
  constructor(
    @InjectRepository(User) private userRepo: MongoRepository<User>,
    private commonService: CommonService,
    @InjectRepository(Role) private roleRepo: MongoRepository<Role>,
  ) {}
  async register(userData: CreateUserDto) {
    validate(userData).then((error) => {
      return error;
    });
    const userExist = await this.getUser(userData.email);

    if (userExist) {
      throw this.commonService.response('400', 'USER EXISTS ALREADY');
    }
    const hashedPassword = await this.helperService.hashPassword(
      userData.password,
    );
    userData.password = hashedPassword;

    return this.userRepo.insertOne({
      ...userData,
      password: hashedPassword,
      role: await this.roleRepo.findOne({
        where: { role_name: userData.roleName },
      }),
    });
  }
  async getUser(username: string) {
    return this.userRepo.findOne({
      where: {
        email: username,
      },
    });
  }
  async getRole() {
    return this.roleRepo.find();
  }
}
