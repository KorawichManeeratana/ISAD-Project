import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/database/dbConnect'
import { error } from 'console';
const bcrypt = require("bcrypt");

export async function POST(req:any){
    try {
        const connection = await mysqlPool;
        const {name, email, password} = await req.json();
        let bigga = await bcrypt.hash(password, 10);
        connection.execute(`INSERT INTO account value(default, '${name}', '${bigga}', '${email}', default, '${"user"}')`)
        connection.end();
        return Response.json({message: "User registered."}, {status: 201});
    } catch {error}{
        console.log("error: ", error);
        return Response.json({
            error : error
        }, { status: 500});
    }
}