import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/database/dbConnect'
import { error } from 'console';
const bcrypt = require("bcrypt");

export async function POST(req:any){
    try {
        const connection = await mysqlPool;
        const {name, password} = await req.json();
        const username = connection.execute(`SELECT ac_id FROM account WHERE email="${name}" OR username="${name}`)
        const userpassword = connection.execute(`SELECT password FROM account WHERE email="${name}" OR username="${name}`)
        connection.end();
        return Response.json({username, userpassword}, {status: 201});

    } catch {error}{
        return Response.json({
            error : error
        }, { status: 500});
    }
}