import { qb } from '@/app/utils/database/qb';
const bcrypt = require("bcrypt");

export async function POST(req : any) {
    const {deleted, ac_id} = await req.json();
    try{
        if(!deleted){
            await qb.deleteFrom("account").where("ac_id", "=", ac_id).execute();
            return Response.json({status: 201});
        }else{
            console.log("somting");
            return Response.json({status: 201});
        }
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}
