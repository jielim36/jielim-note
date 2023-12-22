import { sign } from "jsonwebtoken"
import { User } from "../entity/User"
import { CONST } from "../constants/strings"

export const generateAccessToken = (user:User) => {
    return sign({
        userId: user.id
    } , CONST.ACCESS_TOKEN , {
        expiresIn: '15m',
    })
}

export const gerenateRefreshToken = (user:User) => {
    return sign({
        userId: user.id
    } , CONST.ACCESS_TOKEN , {
        expiresIn: '7d',
    })
}