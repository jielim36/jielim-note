import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {CONST} from "./constants/strings"
import { Note } from "./entity/Note"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: CONST.DB_HOST,
    port: Number(CONST.DB_PORT) | 5432,
    username: CONST.DB_USERNAME,
    password: CONST.DB_PASSWORD,
    database: CONST.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User , Note],
    migrations: [],
    subscribers: [],
})
