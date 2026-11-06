import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginUserDto } from '../dto/authUserDto.js';
import { CreateUserDto } from '../dto/createUserDto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('register')
  registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
