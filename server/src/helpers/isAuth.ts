import { verify } from "jsonwebtoken";
import { MiddlewareFn} from "type-graphql";
import { CONST } from "../constants/strings";
import { MyContext } from "../graphql/resolvers/user.resolver";
import { NextFunction, Request, Response } from "express";


export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    try {
      const bearer = context.req.headers['authorization'];
      if (!bearer) throw new Error('No Authenticated');
  
      const token = bearer.split(' ')[1];
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
  
    return next();
  };