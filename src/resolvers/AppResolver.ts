import { Query, Resolver } from "type-graphql";

@Resolver()
export class AppResolver {
  constructor() {}

  @Query(() => String)
  async hello() {
    return "hello world";
  }
}
