import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/database/dbConnect'
import { error } from 'console';
import { isInt16Array } from 'util/types';
const bcrypt = require("bcrypt");

export async function POST(req:any){
    try {
        const connection = await mysqlPool;
        const {email, name} : {email : string, name: string} = await req.json();
        const user : any = await connection.execute(`SELECT ac_id FROM account WHERE email="${email}"`, [email])
        if (user.length > 0){
            connection.end()
            return Response.json({user}, {status: 201})
        }else {
            connection.end()
            return Response.json(false, {status: 201});
        }
    } catch {error}{
        console.log("error: ", error);
        return Response.json({
            error : error
        }, { status: 500});
    }
}