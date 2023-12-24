import { sign } from "jsonwebtoken"
import { User } from "../entity/User"
import { CONST } from "../constants/strings"
import { Response } from "express"

export const generateAccessToken = (user:User) => {
    return sign({
        userId: user.id,
        tokenVersion: user.token_version
    } , CONST.ACCESS_TOKEN , {
        expiresIn: '24h',
    })
}

export const gerenateRefreshToken = (user:User) => {
    return sign({
        userId: user.id
    } , CONST.ACCESS_TOKEN , {
        expiresIn: '7d',
    })
}

export const sendRefreshToken = (res:Response , refreshToken: string)=>{
    res.cookie(CONST.JWT_COOKIE , refreshToken , {
        httpOnly: true,
    })
}