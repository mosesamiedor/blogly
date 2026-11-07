import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization || '';

    try {
      const decodedUser = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = decodedUser;

      return true;
    } catch (error: any) {
      throw new UnauthorizedException(
        error.message || 'Invalid or expired token',
      );
    }
  }
}
