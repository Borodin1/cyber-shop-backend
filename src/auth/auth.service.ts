import * as argon from 'argon2'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserInput } from 'src/user/dto/user.input';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  TOKEN = 'refreshToken'
  MAX_AGE = 7 * 24 * 60 * 60 * 1000


  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService
  ) { }
  private async createJwt(id: string) {
    const payload = { id: id };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async register(input: CreateUserInput) {
    const exist = await this.userService.findByEmail(input.email)
    if (exist) throw new BadRequestException("user exist")
    const newPass = await argon.hash(input.password)
    const user = await this.userService.create(input, newPass)
    const tokens = await this.createJwt(user.id)
    return { ...user, ...tokens }
  }
  async login(userId: string) {
    const user = await this.userService.findById(userId)
    if (!user) throw new BadRequestException("user not exist")
    const tokens = await this.createJwt(user.id)
    return { ...user, ...tokens }
  }


  async validateUser(email: string, password: string) {
    const exist = await this.userService.findByEmail(email)
    if (!exist) throw new BadRequestException("User not exist")
    const newPass = await argon.verify(exist.password, password)
    if (!newPass) throw new UnauthorizedException('Inviled fileds')
    return exist
  }

  async addTokenInCookie(res: Response, refreshToken: string) {
    res.cookie(this.TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: 'localhost',
      maxAge: this.MAX_AGE,
    })
  }

}
