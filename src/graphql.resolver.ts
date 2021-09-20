import { Author } from './graphql.model';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Author)
export class AuthorResolver {
  readonly AuthorMaps = new Map<number, Author>([
    [1, { id: 1 }],
    [2, { id: 2, firstname: 'test' }],
    [3, { id: 3, firstname: 'john' }],
  ]);

  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.AuthorMaps.get(id);
  }
}
