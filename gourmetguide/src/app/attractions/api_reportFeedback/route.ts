import {NextResponse} from 'next/server'
import db from "@/app/utils/database/db";
import { error } from 'console';
import { isInt16Array } from 'util/types';
const bcrypt = require("bcrypt");

export async function GET(req : any) {
    try{
        const connection = (await db.get())?.getConnection();
        const report : any = await (await connection)?.execute(`SELECT report_des FROM Report`)
        console.log(report);
        (await connection)?.release()
        return Response.json(report, {status: 201});
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}
