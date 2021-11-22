import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorResolver } from './graphql.resolver';
import { NestGResourceTestModule } from './nest-g-resource-test/nest-g-resource-test.module';

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
    NestGResourceTestModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorResolver],
})
export class AppModule {}
