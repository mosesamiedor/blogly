import { IsString, MinLength } from 'class-validator';

export class CommentDto {
  @IsString({ message: 'Comment must be a string' })
  @MinLength(10, { message: 'Comment must be at least 10 characters long' })
  content: string;
}

export class CreateCommentDto extends CommentDto {
  @IsString({ message: 'Blog id must be a string' })
  blogId: string;
}
