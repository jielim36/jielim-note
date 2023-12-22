import "dotenv/config"

export const CONST = {
    SERVER_PORT: process.env.SERVER_PORT!,
    WEB_PORT: process.env.WEB_PORT!,
    SERVER_HOST: process.env.SERVER_HOST,
    WEB_HOST: process.env.WEB_HOST,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN!,
    JWT_COOKIE: process.env.JWT_COOKIE!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_USERNAME: process.env.DB_USERNAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_NAME: process.env.DB_NAME!,
}