import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  // forRootの引数はapolloに渡される
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
