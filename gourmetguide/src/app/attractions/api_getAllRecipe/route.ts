import { qb } from "@/app/utils/database/qb";

export async function POST(req : Response){
    try{
        let data = await qb.selectFrom("recipes").innerJoin("account", "account.ac_id", "recipes.ac_id").select(["recipes.rep_id", "recipes.rep_name", "account.username"]).execute();
        return Response.json(data, {status : 201})
    }catch(error){
        console.log("error in getting user Recipe:", error);
        return Response.json({Message : "getting user recipes error."}, {status: 500})
    }
};