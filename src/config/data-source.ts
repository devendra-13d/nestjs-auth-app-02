import { DataSource } from "typeorm";
import { config } from "dotenv";
import { join } from "path";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    schema: process.env.DB_SCHEMA,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: false
});