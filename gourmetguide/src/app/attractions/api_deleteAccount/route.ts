import { qb } from '@/app/utils/database/qb';

export async function POST(req : any) {
    const ac_id = await req.json();
    try{
        await qb.deleteFrom("account").where("account.ac_id", "=", ac_id).execute();
        return Response.json({Message : "Successfully remove this Account"}, {status:201})
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}