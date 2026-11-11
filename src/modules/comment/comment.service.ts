import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service.js';
import { VerifiedUser } from '../../types.js';
import { CommentDto, CreateCommentDto } from '../../dto/commentDto.js';

interface CommentArgs {
  user: VerifiedUser;
  data: CommentDto;
}

interface AddCommentArgs extends CommentArgs {
  data: CreateCommentDto;
}

interface UpdateCommentArgs extends CommentArgs {
  id: string;
}

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async addCommentToBlog(args: AddCommentArgs) {
    const { user, data } = args;

    const blog = await this.prisma.blog.findUnique({
      where: { id: data.blogId },
    });

    if (!blog) throw new NotFoundException('Uh oh, that blog no longer exists');

    const comment = await this.prisma.comment.create({
      data: {
        content: data.content,
        blogId: data.blogId,
        userId: user.sub,
      },
    });

    return comment;
  }

  async getCommentById(id: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });

    if (!comment)
      throw new NotFoundException('Uh oh, that comment no longer exists');

    return comment;
  }

  async getAllCommentsOnBlog(blogId: string) {
    const blogs = await this.prisma.comment.findMany({ where: { blogId } });

    return blogs;
  }

  async getAllCommentsByUser(userId: string) {
    const blogs = await this.prisma.comment.findMany({ where: { userId } });

    return blogs;
  }

  async updateComment(args: UpdateCommentArgs) {
    const { data, user, id } = args;

    const comment = await this.getCommentById(id);

    if (
      user.role === 'ADMIN' ||
      (user.role === 'USER' && user.sub === comment.userId)
    ) {
      //either admin or user who created the comment
      const updatedComment = await this.prisma.comment.update({
        where: { id: comment.id },
        data: {
          content: data.content,
        },
      });

      return updatedComment;
    } else {
      throw new UnauthorizedException(
        'You do not have permission for this action',
      );
    }
  }

  async deleteCommentById(id: string) {
    const comment = await this.prisma.comment.delete({ where: { id } });

    return comment;
  }
}
