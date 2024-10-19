import { qb } from '@/app/utils/database/qb';

export async function POST(req : any) {
    const rep_id = await req.json();
    try{
        await qb.deleteFrom("recipes").where("recipes.rep_id", "=", rep_id).execute();
        return Response.json({Message : "Successfully remove this Recipe"}, {status:201})
    }
    catch(error){
        console.log('Error :', error);
        return Response.json(error, {status: 500});
    }
}