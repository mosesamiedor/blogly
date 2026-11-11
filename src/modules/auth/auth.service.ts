import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../../dto/authUserDto.js';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../../generated/prisma/models/User.js';
import { CreateUserDto } from '../../dto/createUserDto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    //create user in db - userservice
    const createdUser = await this.userService.createUser(createUserDto);

    //immediately sign them in
    const accessToken = await this.generateAccessToken(createdUser);

    //return a signed object
    return { accessToken };
  }

  async loginUser(user: LoginUserDto) {
    //check user in db - userservice - validate they are who they say they are
    const verifiedUser = await this.userService.verifyUser(
      user.email,
      user.passwordPlain,
    );

    //generate a jwt access token - jwt service
    const accessToken = await this.generateAccessToken(verifiedUser);

    //return a signed object
    return { accessToken };
  }

  private generateAccessToken(user: UserModel) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
