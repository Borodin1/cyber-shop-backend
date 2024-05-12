import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/dto/user';
import { CreateUserInput } from 'src/user/dto/user.input';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }
  @Query(returns => User)
  async getUser() {
    return
  }

  @Mutation(returns => User)
  async signUp(
    @Args('input') input: CreateUserInput,
    @Context() context: any
  ) {
    console.log(context);
    const { refreshToken, ...user } = await this.authService.register(input)
    
    // this.authService.addTokenInCookie(res, refreshToken)
    return user
  }
}
