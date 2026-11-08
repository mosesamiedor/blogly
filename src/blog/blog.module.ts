import { Module } from '@nestjs/common';
import { BlogService } from './blog.service.js';
import { BlogController } from './blog.controller.js';
import { PrismaService } from '../services/prisma/prisma.service.js';

@Module({
  providers: [BlogService, PrismaService],
  controllers: [BlogController],
})
export class BlogModule {}
