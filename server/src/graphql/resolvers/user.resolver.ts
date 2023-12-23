import { User } from "../../entity/User"
import { compare, hash } from "bcryptjs";
import { generateAccessToken , gerenateRefreshToken, sendRefreshToken } from "../../helpers/generateToken";
import { Field, ObjectType, UseMiddleware } from "type-graphql";
import { Request, Response } from "express";
import { CONST } from "../../constants/strings";
import { AppDataSource } from "../../data-source";
import { isAuth } from "../../helpers/isAuth";
import { verify } from "jsonwebtoken";

class LoginResponse {
    status: number;
    access_token: string;
    data: User;
}

export interface MyContext {
    req: Request,
    res: Response,
    tokenPayload?: any,
}

export const userResolver = {
    Query: {
        hello: ()=> "HELLO WORLD!!!",

        me: async(_:any,__:any, context: MyContext) => {
            try {
                const bearer = context.req.headers['authorization'];
                
                if (!bearer) throw new Error('No Authenticated');
            
                const token = bearer.split(' ')[1];
                console.log(token);
                
                if (!token) throw new Error('Not Authenticated');
            
                const tokenPayload = await verify(token, CONST.ACCESS_TOKEN);
                if (!tokenPayload) throw new Error('Not Authenticated');
            
                // Assuming you want to store the decoded token payload in the context
                context.tokenPayload = tokenPayload as any;
            } catch (error) {
                // If an error occurs during authentication, you might want to handle it appropriately.
                // For now, just rethrowing the error.
                throw new Error('Not Authenticated');
            }

            const payload = context.tokenPayload;
            console.log(context);
            
            if(!payload) throw new Error("User not authenticate")

            try {
                const user = await User.findOneBy({
                    id: payload.userId
                })

                if(!user) throw new Error("User not found");

                return user;
            } catch (error) {
                throw new Error("Unable to fetch user")
            }
        },
        getUsers: async () => {
            return await User.find();
        },
        findUser: async (parent:any, args:any)  => {
            const findUser = await User.findOneBy({
                email: args.email
            });
            
            return findUser;
        }
    },
    Mutation: {
        createUser: async (parent:any,args:any)=>{
            try{
                const user = args.user;
                const findUser = await User.findOneBy({
                    email: user.email
                });

                if(findUser){
                    throw new Error("User with that email is already esist!");
                }

                await User.insert({
                    email: user.email,
                    username: user.username,
                    password: await hash(user.password,12),
                });

                return await User.findOneBy({
                    email: user.email,
                    username: user.username
                });
            }catch (error: any){
                throw new Error(error);
            }
        },

        userLogin: async (parent:any, args:any , contextValue:MyContext) => {
            try {
                const user = args.user;
                const findUser = await User.findOneBy({
                    email: user.email
                });
                if(!findUser) throw new Error("User with that email is doesn't exist");

                const isPasswordValid = await compare(user.password , findUser.password);//compare()  method is use for decrypt and  comapre
                if(!isPasswordValid) throw new Error("Password is invalid");

                const accessToken = generateAccessToken(findUser);
                const refreshToken = gerenateRefreshToken(findUser);
                contextValue.res.cookie(CONST.JWT_COOKIE, refreshToken , {
                    httpOnly: true
                });

                sendRefreshToken(contextValue.res, refreshToken);

                const loginRespose = new LoginResponse();
                loginRespose.status = 200;
                loginRespose.access_token = accessToken;
                loginRespose.data = findUser;
                return loginRespose;

            } catch (error:any) {
                throw new Error(error);
            }
        },

        revokeUserSession: async (parent:any, args:any): Promise<boolean> => {

            await AppDataSource.getRepository(User).increment({id: args.userId} , "token_version", 1);


            return true;
        }
    }
}