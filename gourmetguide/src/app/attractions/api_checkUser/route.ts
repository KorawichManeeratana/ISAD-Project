import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/database/dbConnect'
import { error } from 'console';
const bcrypt = require("bcrypt");

export async function POST(req:any){
    try {
        const connection = await mysqlPool;
        const {email} = await req.json();
        const user = await connection.execute(`SELECT ac_id FROM account WHERE email="${email}" OR name="${email}"`)
        console.log("User: ", user);

        connection.end();
        return Response.json({user}, {status: 201});
    } catch {error}{
        console.log("error");
    }
}