import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/createUserDto.js';
import { PrismaService } from '../services/prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.passwordPlain, 10);

    await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        passwordHash,
      },
    });

    return { message: 'User created successfully' };
  }
}
