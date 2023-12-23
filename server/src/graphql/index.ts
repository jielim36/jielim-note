import { gql } from "apollo-server-express";
import { readFileSync } from "fs";
import path from "path";
import { userResolver } from "./resolvers/user.resolver";
import { noteResolver } from "./resolvers/note.resolver";

const userTypes = readFileSync(path.join(__dirname , "./typeDefs/user.graphql"),{
    encoding: "utf-8"
})

const noteTypes = readFileSync(path.join(__dirname , "./typeDefs/note.graphql"),{
    encoding: "utf-8"
})

export const typeDefs = gql`
    ${userTypes},
    ${noteTypes}
`;

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...noteResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...noteResolver.Mutation
    }
};
