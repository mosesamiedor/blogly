import { IsString, MinLength } from 'class-validator';

export class CreateNewBlogDto {
  @IsString()
  @MinLength(6, { message: 'Blog title must be at least 6 letters long' })
  title: string;

  @IsString()
  @MinLength(50, { message: 'Blog content must be at least 50 letters long' })
  content: string;
}

export class UpdateBlogDto {
  @IsString()
  @MinLength(50, { message: 'Blog content must be at least 50 letters long' })
  content: string;
}
