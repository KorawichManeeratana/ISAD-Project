
import { mysqlPool } from '@/app/utils/database/dbConnect'
import tokenManage from "./tokenManage";
import { cookies } from 'next/headers'
const bcrypt = require('bcrypt')
import { redirect } from "next/navigation";

const cookie = cookies();

export default class loginSystem {
    public static async getValue(connection: any, query: string) {
        try {
            const [rows] = await connection.query(query);
            console.log("q:", query)
            if (rows.length > 0) {
                return rows[0];
            } else {
                console.log('No results found');
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public static async checkLogin(email: string, password: string): Promise<boolean> {
        let connection;

        try {
            connection = await mysqlPool;
            const result = await loginSystem.getValue(connection, `SELECT ac_id, password, role FROM account WHERE email=${email} OR username=${email}`);
            console.log("rowsInCheck:", result)
            console.log("password:", result.password)
            console.log("id:", result.ac_id)
            console.log("role:", result.role)
            if (bcrypt.compare(password, result.password)) {
                let output: {access: string, refresh: string} = await tokenManage.getNewToken(result.ac_id, result.role);

                cookie.set('token', output.access);
                cookie.set('askNewOne', output.refresh);
            
            } else {
                return false;
            }

        } catch (error) {
            console.log(`${email} does not exist in database.`); 
            return false;
        }finally {
            if (connection) connection.end();
        }

        redirect('/');
    }
}