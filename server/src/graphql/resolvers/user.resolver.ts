import { User } from "../../entity/User"
import { compare, hash } from "bcryptjs";
import { generateAccessToken , gerenateRefreshToken, sendRefreshToken } from "../../helpers/generateToken";
import { CONST } from "../../constants/strings";
import { AppDataSource } from "../../data-source";
import { isAuth } from "../../helpers/isAuth";
import { MyContext } from "../..";

class LoginResponse {
    status: number;
    access_token: string;
    data: User;
}

export const userResolver = {
    Query: {
        hello: ()=> "HELLO WORLD!!!",

        me: async(_:any,__:any, context: MyContext) => {

            if(!await isAuth(context)) throw new Error("User not authenticate");

            const payload = context.tokenPayload;
            
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
        },

        logout: async (_:any, __:any , context:MyContext) => {
            context.res.clearCookie(CONST.JWT_COOKIE);
            return true;
        }
    }
}