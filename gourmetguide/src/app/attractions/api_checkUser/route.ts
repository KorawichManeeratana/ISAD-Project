import {NextResponse} from 'next/server'
import db from "@/app/utils/database/db";
import { error } from 'console';
import { isInt16Array } from 'util/types';
const bcrypt = require("bcrypt");

export async function POST(req:any){
    try {
        const connection = (await db.get())?.getConnection();
        const {email, name} : {email : string, name: string} = await req.json();
        const user : any = await (await connection)?.execute(`SELECT ac_id FROM account WHERE email="${email}"`, [email])
        if (user.length > 0){
            (await connection)?.release()
            return Response.json({user}, {status: 201})
        }else {
            (await connection)?.release()
            return Response.json(false, {status: 201});
        }
    } catch {error}{
        console.log("error: ", error);
        return Response.json({
            error : error
        }, { status: 500});
    }
}