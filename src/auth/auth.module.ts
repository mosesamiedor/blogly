import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../services/prisma/prisma.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, PrismaService],
})
export class AuthModule {}
