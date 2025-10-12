import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./data/build-schema";
import { Resolver } from "./data/resolver";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const rootValue = new Resolver();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
