import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'https://app.ivai.news/graphql',
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default client;
