import { Field, Int, InputType } from "@nestjs/graphql"
import { Brand } from "./post"

@InputType()
export class PostInput {
  @Field(type => String)
  title: string
  @Field(type => [Int])
  prices: number[]
  @Field(type => [String])
  colors: string[]
  @Field(type => [Int])
  memory: number[]
  @Field(type => [String])
  logos: string[]
  @Field(type => String)
  brand: string
  @Field(type => String)
  screenSize: string
  @Field(type => String)
  CPU: string
  @Field(type => String)
  MainCamera: string
  @Field(type => String)
  FrontCamera: string
  @Field(type => Int)
  Battery: number
  @Field(type => String)
  description: string
  @Field(type => String)
  screenResolution: string
  @Field(type => String)
  screenType: string
  @Field(type => String)
  pixelDebcity: string
}
