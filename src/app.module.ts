import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorResolver } from './graphql.resolver';

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
  ],
  controllers: [AppController],
  providers: [AppService, AuthorResolver],
})
export class AppModule {}
