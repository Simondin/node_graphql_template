import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import schema  from './graphql/schema'

const app = express();
const root = {
    ping: () => {
        return new Date;
    },
};

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: root,
}));

export default app;