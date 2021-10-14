import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorResolver } from './graphql.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  // forRootの引数はapolloに渡される
  imports: [
    GraphQLModule.forRoot({
      // typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.model.ts'),
      //   outputAs: 'class',
      // },
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorResolver],
})
export class AppModule {}
