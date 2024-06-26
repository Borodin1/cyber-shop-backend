import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string
  
  @Field()
  email: string
  
  @Field()
  password: string
  
}
@InputType()
export class LogInUserInput {
  
  @Field()
  email: string
  
  @Field()
  password: string
  
}
