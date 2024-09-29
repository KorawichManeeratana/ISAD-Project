/* import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/db'
import { error } from 'console';
const bcrypt = require("bcrypt");
export async function POST(req:any){
    try {
        const connection = await mysqlPool;
        const {name, email, password} = await req.json();
        let bigga = await bcrypt.compare(password, 14);
        const check = await connection.execute(`SELECT username FROM account WHERE username= '${name}' OR email= '${name}'`)
        connection.end();
        return NextResponse.json({message: "Login Success"}, {status: 201});
    } catch {error}{
        return NextResponse.json({
            error : error
        }, { status: 500});
    }
} */