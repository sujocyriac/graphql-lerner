import express from "express";
import path from "path";
import { graphqlHTTP } from "express-graphql";
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';



const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("A GraphQL API is running at /graphql");
});


const typeDefsArray = loadFilesSync(path.join(__dirname, 'schema', './**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, 'schema', './**/*resolver.js'));


const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

//console.log("GraphQL schema created", schema);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
