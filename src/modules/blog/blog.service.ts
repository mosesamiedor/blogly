import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service.js';
import { CreateNewBlogDto, UpdateBlogDto } from '../../dto/blogDto.js';
import { VerifiedUser } from '../../types.js';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewBlog(createNewBlogDto: CreateNewBlogDto, userId: string) {
    const blog = await this.prisma.blog.create({
      data: {
        content: createNewBlogDto.content,
        title: createNewBlogDto.title,
        userId,
      },
    });

    return blog;
  }

  async getBlog(blogId: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog)
      throw new NotFoundException(
        "Uh oh, it looks like that blog doesn't exist",
      );

    return blog;
  }

  async getAllBlogsByUser(userId: string) {
    const blogs = await this.prisma.blog.findMany({ where: { userId } });

    return blogs;
  }

  async updateBlog(
    blogId: string,
    updateBlogDto: UpdateBlogDto,
    user: VerifiedUser,
  ) {
    const blog = await this.getBlog(blogId);

    if (
      user.role === 'ADMIN' ||
      (user.role === 'USER' && user.sub === blog.userId)
    ) {
      const updatedBlog = await this.prisma.blog.update({
        where: { id: blog.id },
        data: updateBlogDto,
      });

      return updatedBlog;
    } else {
      throw new UnauthorizedException(
        'You do not have permission for this action',
      );
    }
  }

  async deleteBlog(blogId: string) {
    const foundBlog = await this.prisma.blog.delete({
      where: { id: blogId },
    });

    return foundBlog;
  }
}
