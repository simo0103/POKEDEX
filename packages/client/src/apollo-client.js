import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from
} from '@apollo/client';


const link = from([
    new HttpLink({ uri: 'http://localhost:4000' }),
])

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export { client };
