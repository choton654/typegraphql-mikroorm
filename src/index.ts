import express from "express";
import "reflect-metadata";
import { graphqlHTTP } from "express-graphql";
import * as http from "http";
import { NextApiHandler } from "next";
import { buildSchema, buildSchemaSync } from "type-graphql";
import path from "path";
import { AppResolver } from "./resolvers/AppResolver";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const schema = buildSchemaSync({
  resolvers: [AppResolver],
  emitSchemaFile: true,
  validate: false,
});

app.use(
  "/api/graphql",
  graphqlHTTP((req, res) => {
    return {
      schema,
      graphiql: true,
    };
  })
);

export async function getListener() {
  const server: http.Server = http.createServer(app);
  const [listener] = server.listeners("request") as NextApiHandler[];
  return { listener };
}
