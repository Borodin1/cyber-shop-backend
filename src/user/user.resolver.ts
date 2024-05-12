import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';

import { CreateUserInput } from './dto/user.input';

const User = ''

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
