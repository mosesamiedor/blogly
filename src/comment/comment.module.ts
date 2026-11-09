import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller.js';
import { CommentService } from './comment.service.js';
import { PrismaService } from '../services/prisma/prisma.service.js';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
