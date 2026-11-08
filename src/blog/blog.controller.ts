import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JWTAuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { Roles } from '../decorators/roles.decorator.js';
import type { VerifiedUser } from '../types.js';
import { UserRoles } from '../types.js';
import { CurrentUser } from '../decorators/user.decorator.js';
import { BlogService } from './blog.service.js';
import { CreateNewBlogDto, UpdateBlogDto } from '../dto/blogDto.js';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  @UseGuards(JWTAuthGuard)
  async createNewBlog(
    @Body(ValidationPipe) createNewBlogDto: CreateNewBlogDto,
    @CurrentUser() user: VerifiedUser,
  ) {
    const blog = await this.blogService.createNewBlog(
      createNewBlogDto,
      user.sub,
    );

    return {
      data: blog,
      message: 'New blog created',
    };
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async fetchBlogsByUser(@Query('user') userId: string) {
    const blogs = await this.blogService.getAllBlogsByUser(userId);

    return {
      data: blogs,
      message: 'Hola',
    };
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  async fetchBlogById(@Param() param: { id: string }) {
    const blog = await this.blogService.getBlog(param.id);

    return {
      data: blog,
      message: 'Hola',
    };
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  async updateBlogById(
    @Param() param: { id: string },
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto,
    @CurrentUser() user: VerifiedUser,
  ) {
    const blog = await this.blogService.updateBlog(
      param.id,
      updateBlogDto,
      user,
    );

    return {
      data: blog,
      message: 'Hola',
    };
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  async deleteBlog(@Param() param: { id: string }) {
    const blog = await this.blogService.deleteBlog(param.id);

    return {
      data: blog,
      message: 'Hola',
    };
  }
}
