import "dotenv/config"

export const CONST = {
    PORT: process.env.PORT!,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN!,
    JWT_COOKIE: process.env.JWT_COOKIE!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_USERNAME: process.env.DB_USERNAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_NAME: process.env.DB_NAME!,
}