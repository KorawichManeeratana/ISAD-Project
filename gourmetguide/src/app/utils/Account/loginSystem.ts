
import db from '@/app/utils/database/db'
import tokenManage from "./tokenManage";
import { cookies } from 'next/headers'
const bcrypt = require('bcrypt')
import { redirect } from "next/navigation";
import { qb } from '../database/qb';

const cookie = cookies();

export default class loginSystem {
    public static async checkLogin(email: string, password: string): Promise<boolean> {
        console.log("email:", email)
        try {
            const result : any = await qb.selectFrom("account").select(["account.ac_id", "account.password", "account.role", "account.userPFP"]).where("account.email", "=", email).execute();
            console.log("rowsInCheck:", result[0])
            console.log("password:", result[0].password)
            console.log("id:", result[0].ac_id)
            console.log("role:", result[0].role)
            if (bcrypt.compare(password, result[0].password)) {
                let output: {access: string, refresh: string} = await tokenManage.getNewToken(result[0].ac_id, result[0].role, result[0].userPFP);

                cookie.set('token', output.access);
                cookie.set('askNewOne', output.refresh);

            } else {
                return false;
            }
        } catch (error) {
            console.log(`${email} does not exist in database.`); 
            return false;
        }
        redirect('/');
    }
}