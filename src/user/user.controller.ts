import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from '../dto/createUserDto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
