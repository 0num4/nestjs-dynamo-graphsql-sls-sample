import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field({
    nullable: true,
  })
  firstname?: string;

  @Field({
    nullable: true,
  })
  lastname?: string;
}
