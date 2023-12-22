import { AppDataSource } from "./data-source"
import express, { Express , Request , Response } from "express";
import {CONST} from './constants/strings';
import cors from "cors";
import morgan from "morgan";
import { ApolloServer , gql } from "apollo-server-express";
import { buildSchema } from "graphql";
import { typeDefs, resolvers } from "./graphql"
import { MyContext } from "./graphql/resolvers/user.resolver";

AppDataSource.initialize().then(async () => {

    //Running express server
    const app = express();
    //middleware
    app.use(cors());
    app.use(morgan("dev"))

    //running apollo server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req,res}): MyContext => ({req,res})
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app});

    app.listen(CONST.PORT, ()=>{
        console.log(`Server running on port number: ${CONST.PORT}`);
    })

}).catch(error => console.log(error))
