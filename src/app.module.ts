import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { BlogModule } from './modules/blog/blog.module.js';
import { CommentModule } from './modules/comment/comment.module.js';
import { PrismaService } from './services/prisma/prisma.service.js';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    BlogModule,
    CommentModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  onApplicationBootstrap() {
    this.seedDB();
  }

  async seedDB() {
    const foundAdmin = this.prisma.user.findUnique({
      where: { role: 'ADMIN', username: 'testadmin' },
    });

    if (!foundAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 10);

      await this.prisma.user.create({
        data: {
          email: 'testadmin@user.com',
          name: 'Test Admin',
          passwordHash,
          username: 'testadmin',
          role: 'ADMIN',
        },
      });
    }
  }
}
