import { qb } from "@/app/utils/database/qb";

export async function POST(req : Response){
    const {rep_id, isClick, ac_id} = await req.json()
    try{
        if (!isClick){
            await qb.insertInto("Favourite").values({rep_id : rep_id, ac_id : ac_id}).execute()
        }else {
            await qb.deleteFrom("Favourite").where("Favourite.ac_id", "=", ac_id).where("Favourite.rep_id", "=", rep_id).execute();
        }
        return Response.json({Message : "Favourite ADD or unFavourtie Success!"}, {status:201});
    }catch(error){
        console.log("Error Favourite occur:", error)
        return Response.json({Message : "Error during add favourite"}, {status:500});
    }
}