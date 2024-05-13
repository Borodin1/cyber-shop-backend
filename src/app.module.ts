import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res })
    }),
    PrismaModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
