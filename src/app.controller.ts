import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { JWTAuthGuard } from './guards/auth.guard.js';
import { RolesGuard } from './guards/role.guard.js';
import { Roles } from './decorators/roles.decorator.js';
import { UserRoles } from './types.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('helloo')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @UseGuards(JWTAuthGuard, RolesGuard)
  getHelloo(): string {
    return `${this.appService.getHello()} from the other side`;
  }
}
