import { qb } from '@/app/utils/database/qb';
const bcrypt = require("bcrypt");

export async function POST(req : any) {
    try{
        let data = await qb.selectFrom("account").select([
            "account.ac_id",
            "account.username",
            "account.email",
            "account.role"
        ]).execute();
        return Response.json(data, {status: 201});
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}
