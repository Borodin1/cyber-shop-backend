import { Resolver, Query, Mutation, Context, } from '@nestjs/graphql';
import { LogOut, User } from './dto/user';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @CurrentUser() user: User
  ) {
    return user
  }

  @Mutation(returns => LogOut)
  @UseGuards(JwtAuthGuard)
  async logOut(
    @CurrentUser() user: User,
    @Context('res') res: Response
  ) {
    const { message } = await this.userService.logOut(user.id)
    this.authService.removeTokenInCookie(res)
    return message
  }
}
