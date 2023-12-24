import { AppDataSource } from "./data-source"
import express, { Express , Request , Response } from "express";
import {CONST} from './constants/strings';
import cors from "cors";
import morgan from "morgan";
import { ApolloServer , gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql"
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { generateAccessToken } from "./helpers/generateToken";
import cookieParser from "cookie-parser";
import { isAuth } from "./helpers/isAuth";

export interface MyContext {
    req: Request,
    res: Response,
    tokenPayload?: {
        userId: string;
        tokenVersion?: number;
    },
}

AppDataSource.initialize().then(async () => {

    //Running express server
    const app = express();
    //middleware
    app.use(cors({
        origin: [
            `http://${CONST.WEB_HOST}:${CONST.WEB_PORT}`,
            'https://studio.apollographql.com'//enable to using apollo graphql sandbox
        ],
        credentials: true
    }));
    app.use(morgan("dev"))
    app.use(cookieParser());

    app.post('/refresh-token', async(req,res)=>{
        const token = req.cookies[CONST.JWT_COOKIE];
        if(!token){
            console.log(2222222222222);
            return res.send({
                status: 204,
                success: false,
                msg: "No token cookie included in request.",
                access_token: "",
            })  
        } 
        let data: any = null;
        try {
            console.log(333333333333333);
            
            data = verify(token , CONST.REFRESH_TOKEN);
            console.log(5444444444444444);

        } catch (error) {
            console.log(111111111111);
            
            console.error(error);
            return res.send({
                status: 203,
                success: false,
                msg: "Invalid Token",
                access_token: "",
            })
        }

        const user = await User.findOneBy({
            id: data.userId
        });

        if(!user){
            return res.send({
                status: 203,
                success: false,
                msg: "Invalid Token",
                access_token: "",
            })
        }

        if(user.token_version !== data.tokenVersion){
            return res.send({
                status: 203,
                success: false,
                msg: "Invalid Token",
                access_token: "",
            })
        }

        const access_token = generateAccessToken(user);
        return res.send({
            status: 200,
            success: true,
            msg: "Login Successfully",
            access_token: access_token
        })

    })


    //running apollo server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req,res}): MyContext => ({req,res})
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app , cors: false });


    app.listen(CONST.SERVER_PORT, ()=>{
        console.log(`Server running on port number: ${CONST.SERVER_PORT}`);
    })

}).catch(error => console.log(error))
