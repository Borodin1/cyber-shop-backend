import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './dto/post';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PostInput } from './dto/post.input';


@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('input') input: PostInput
  ) {
    return this.postService.createPost(input)
  }

  @Query(() => [Post])
  async getAll() {
    return await this.postService.getAll()
  }
  @Query(() => Post)
  async getOne(
    @Args('id') id: string
  ) {
    return await this.postService.getOne(id)
  }
}