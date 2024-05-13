import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/dto/user';
import { CreateUserInput, LogInUserInput } from 'src/user/dto/user.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { Request, Response } from 'express';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(returns => User)
  async getUser(
  ) {}

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
    @Context('req') req: Request
  ) {
    const { refreshToken, ...user } = await this.authService.login(req.user as string)
    this.authService.addTokenInCookie(res, refreshToken)
    return user
  }
}
