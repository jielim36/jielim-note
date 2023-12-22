import { User } from "../../entity/User"
import { compare, hash } from "bcryptjs";
import { generateAccessToken , gerenateRefreshToken } from "../../helpers/generateToken";
import { Field, ObjectType } from "type-graphql";
import { Request, Response } from "express";
import { CONST } from "../../constants/strings";

class LoginResponse {
    status: number;
    access_token: string;
    data: User;
}

export interface MyContext {
    req: Request,
    res: Response
}

export const userResolver = {
    Query: {
        hello: ()=> "HELLO WORLD!!!",
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

                const loginRespose = new LoginResponse();
                loginRespose.status = 200;
                loginRespose.access_token = accessToken;
                loginRespose.data = findUser;
                return loginRespose;

            } catch (error:any) {
                throw new Error(error);
            }
        }
    }
}