import { Module } from '@nestjs/common';
import { BlogService } from './blog.service.js';
import { BlogController } from './blog.controller.js';
import { PrismaService } from '../services/prisma/prisma.service.js';
import { UserService } from '../user/user.service.js';

@Module({
  providers: [BlogService, PrismaService, UserService],
  controllers: [BlogController],
})
export class BlogModule {}
