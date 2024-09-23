import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/db'
import { error } from 'console';

export async function POST(req:any){
    try {
        const connection = await mysqlPool;
        const {name, email, password} = await req.json();
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);
        connection.execute(`INSERT INTO account value(default, '${name}', '${password}', '${email}')`)
        connection.end();
        return NextResponse.json({message: "User registered."}, {status: 201});
    } catch {error}{
        return NextResponse.json({
            error : error
        }, { status: 500});
    }
}