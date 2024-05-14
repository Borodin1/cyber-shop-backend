import { Field, ObjectType, } from "@nestjs/graphql";
import { Post } from "src/post/dto/post";

@ObjectType()
export class User {
  @Field(type => String)
  id: string

  @Field(type => String, { nullable: true })
  username: string

  @Field(type => String)
  email: string

  @Field(type => String)
  password: string

  @Field(type => Date, { nullable: true })
  createdAt: Date

  @Field(type => Date, { nullable: true })
  updateAt: Date

  @Field(type => String)
  accessToken: string

  @Field(type => [Item], { nullable: 'itemsAndList' })
  cartItems: Item[]
}

@ObjectType()
export class LogOut {
  @Field(type => String)
  message: string
}

@ObjectType()
export class BasketRespopnse {
  @Field()
  postId: string

  @Field()
  userId: string

  @Field(() => Post)
  post: Post

  @Field(() => User)
  user: User

  @Field()
  quantity: number


}
@ObjectType()
export class Item {
  @Field()
  id: string

  @Field()
  quantity: number

  @Field()
  userId: string

  @Field()
  postId: string

  @Field(type => Post)
  post: Post
}