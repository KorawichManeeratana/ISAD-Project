import { createPool } from "mysql2";
import {DB} from "kysely-codegen"
import { Kysely, MysqlDialect } from "kysely";

const dialect = new MysqlDialect({
    pool : createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        port: parseInt(process.env.DB_PORT!),
        multipleStatements: true,
        connectionLimit: 10,
        enableKeepAlive: true})
});
export const qb = new Kysely<DB>({dialect, })