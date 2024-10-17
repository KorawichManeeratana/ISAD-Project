import { qb } from "@/app/utils/database/qb";

export async function POST(req : Response){
    const {rep_id, ac_id} = await req.json()
    try{
        await qb.deleteFrom("Favourite").where("Favourite.ac_id", "=", ac_id).where("Favourite.rep_id", "=", rep_id).execute();

        return Response.json({Message : "unFavourtie Success!"}, {status:201});
    }catch(error){
        console.log("Error Favourite occur:", error)
        return Response.json({Message : "Error during add favourite"}, {status:500});
    }
}