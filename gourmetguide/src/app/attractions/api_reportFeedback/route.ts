import {NextResponse} from 'next/server'
import db from "@/app/utils/database/db";
import { error } from 'console';
import { isInt16Array } from 'util/types';
import { json } from 'stream/consumers';
import { qb } from '@/app/utils/database/qb';
const bcrypt = require("bcrypt");

export async function POST(req : any) {
    try{
        let report = await qb.selectFrom("Report").innerJoin("account", "Report.ac_id", "account.ac_id").select([
            "account.ac_id",
            "account.username",
            "Report.report_des",
            "Report.status",
            "Report.created_date"
        ]).execute();
        console.log(report);
        return Response.json(report, {status: 201});
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}
