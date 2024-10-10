import db from "@/app/utils/database/db";
import { qb } from "@/app/utils/database/qb";

export async function POST(req : any) {
    try{
        const {ac_id, report_type, report_des, date} = await req.json();
        await qb.insertInto("Report").values({ac_id : ac_id, report_type : report_type, report_des: report_des, created_date : date}).execute();

        return Response.json({message : "Report Success!!"}, {status : 201})

    }catch(error){
        console.log("error:", error)
    }
}