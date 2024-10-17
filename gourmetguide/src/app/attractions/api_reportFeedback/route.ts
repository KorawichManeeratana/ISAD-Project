import {NextResponse} from 'next/server'
import db from "@/app/utils/database/db";
import { error } from 'console';
import { isInt16Array } from 'util/types';
import { json } from 'stream/consumers';
import { qb } from '@/app/utils/database/qb';
const bcrypt = require("bcrypt");

export async function POST(req : any) {
    const {deleted, report_id} = await req.json();
    try{
        let report = await qb.selectFrom("Report").innerJoin("account", "Report.ac_id", "account.ac_id").select([
            "Report.report_id",
            "account.username",
            "Report.report_des",
            "Report.status",
            "Report.created_date"
        ]).execute();
        // if(deleted){
        //     await qb.deleteFrom("Report").where("report_id", "=", report_id).execute();
        // }
        return Response.json(report, {status: 201});
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}
