import { Resolver, Query, Mutation, Context, Args, } from '@nestjs/graphql';
import { BasketRespopnse, LogOut, User } from './dto/user';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
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
    console.log(user)
    
    return user
  }

  @Mutation(returns => LogOut)
  @UseGuards(JwtAuthGuard)
  async logOut(
    @CurrentUser() user: User,
    @Context('res') res: Response
  ) {
    const  message = await this.userService.logOut(user.id)
    this.authService.removeTokenInCookie(res)
    console.log(message);
    
    return message
  }

  @Mutation(returns => BasketRespopnse)
  @UseGuards(JwtAuthGuard)
  async add(
    @CurrentUser() user: User,
    @Args('postId') postId: string
  ) {
    const data = await this.userService.addInBasket(postId, user.id)
    return data
  }
}
