import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schema.graphql';

// type definitions
type Link = {
  id: string;
  url: string;
  description: string;
}

// in lieau of database
const links: Link[] = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// resolver functions
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  // trivial resolver def and not needed
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
  Mutation: {
    post: (parent: unknown, args: { description: string, url: string }): Link => {
      let idCount = links.length;
      const link: Link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      // pushes link to collection
      links.push(link);

      // returns one link
      return link;
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
