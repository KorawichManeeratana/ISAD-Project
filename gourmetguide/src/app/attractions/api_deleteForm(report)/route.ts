import { qb } from '@/app/utils/database/qb';
const bcrypt = require("bcrypt");

export async function POST(req : any) {
    const {deleted, report_id} = await req.json();
    try{
        if(!deleted){
            await qb.deleteFrom("Report").where("report_id", "=", report_id).execute();
            return Response.json({status: 201});
        }else{
            console.log("โง่ๆ");
            return Response.json({status: 201});
        }
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}
