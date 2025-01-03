import mysql, { Pool, PoolOptions } from "mysql2/promise";
const dotenv = require("dotenv");
dotenv.config()

export default class dbConnector {
    private connection: Pool | undefined;
    private setting: PoolOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        port: parseInt(process.env.DB_PORT!),
        multipleStatements: true,
        connectionLimit: 10,
        enableKeepAlive: true
    } 

    constructor() {
        try {
            this.connection = mysql.createPool(this.setting);
        } catch (error) {
            console.log("No you can't", error);
        }
    }
    
    public async get() {
        console.log("kuyyyyyyyyyyyyyyyy:", process.env.DB_HOST)
        return this.connection;
    }
}