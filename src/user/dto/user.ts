import { Field, ObjectType, } from "@nestjs/graphql";

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

  @Field(type => String, { nullable: true })
  createdAt: string

  @Field(type => String, { nullable: true })
  updateAt: string

  @Field(type => String)
  accessToken: string

  @Field(type => String)
  refreshToken: string

}