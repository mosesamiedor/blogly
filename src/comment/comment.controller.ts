import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service.js';
import { JWTAuthGuard } from '../guards/auth.guard.js';
import { CommentDto, CreateCommentDto } from '../dto/commentDto.js';
import { CurrentUser } from '../decorators/user.decorator.js';
import { UserRoles, type VerifiedUser } from '../types.js';
import { Roles } from '../decorators/roles.decorator.js';
import { RolesGuard } from '../guards/role.guard.js';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @UseGuards(JWTAuthGuard)
  async createNewComment(
    @Body() body: CreateCommentDto,
    @CurrentUser() user: VerifiedUser,
  ) {
    const comment = await this.commentService.addCommentToBlog({
      data: body,
      user,
    });

    return {
      message: 'New comment added',
      data: comment,
    };
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async fetchComments(@Query() query: { blogId?: string; userId?: string }) {
    if (query.userId) {
      const comments = await this.commentService.getAllCommentsByUser(
        query.userId,
      );

      return {
        message: 'Comments retrieved',
        data: comments,
      };
    } else if (query.blogId) {
      const comments = await this.commentService.getAllCommentsOnBlog(
        query.blogId,
      );

      return {
        message: 'Comments retrieved',
        data: comments,
      };
    } else {
      throw new BadRequestException(
        'Either userId or blogId must be provided in query',
      );
    }
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  async fetchCommentById(@Param() param: { id: string }) {
    const comment = await this.commentService.getCommentById(param.id);

    return {
      message: 'Comment retrieved',
      data: comment,
    };
  }

  @Put(':id')
  @UseGuards(JWTAuthGuard)
  async updateCommentById(
    @Body() updatecommentDto: CommentDto,
    @Param() param: { id: string },
    @CurrentUser() user: VerifiedUser,
  ) {
    const updatedComment = await this.commentService.updateComment({
      id: param.id,
      user,
      data: updatecommentDto,
    });
    return {
      message: 'Comment updated',
      data: updatedComment,
    };
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  async deleteCommentById(@Param() param: { id: string }) {
    const deletedComment = await this.commentService.deleteCommentById(
      param.id,
    );

    return {
      message: 'Comment deleted',
      data: deletedComment,
    };
  }
}
