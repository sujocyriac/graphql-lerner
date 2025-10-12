import { buildSchema } from "graphql";
import fs from "fs";

// Read the .graphql file content as string
const schemaString = fs.readFileSync("./data/schema.graphql", {
  encoding: "utf-8",
});

// Build the GraphQL schema
export const schema = buildSchema(schemaString);
