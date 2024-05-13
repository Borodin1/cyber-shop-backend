import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/dto/user';
import { CreateUserInput, LogInUserInput } from 'src/user/dto/user.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { Response } from 'express';
import { CurrentUser } from './decorators/user.decorator';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(returns => User)
  async getUser(
  ) { }

  @Mutation(returns => User)
  async signUp(
    @Args('input') input: CreateUserInput,
    @Context('res') res: Response
  ) {
    const { refreshToken, ...user } = await this.authService.register(input)
    this.authService.addTokenInCookie(res, refreshToken)
    return user
  }

  @Mutation(returns => User)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('input') input: LogInUserInput,
    @Context('res') res: Response,
    @CurrentUser() userId: string
  ) {
    const { refreshToken, ...user } = await this.authService.login(userId)
    this.authService.addTokenInCookie(res, refreshToken)
    return user
  }
}
