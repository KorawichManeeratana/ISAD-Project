import { qb } from "@/app/utils/database/qb";

export async function POST(req : Response){
    const ac_id = await req.json()
    try{
        const data = await qb.selectFrom("Favourite").innerJoin("recipes", "Favourite.rep_id", "recipes.rep_id").select(["recipes.rep_name", "recipes.rep_des", "recipes.calories", "recipes.rep_time", "recipes.rep_img", "recipes.rep_id"]).where("Favourite.ac_id", "=", ac_id).execute();
        return Response.json(data, {status : 201})
    }catch(error){
        console.log("error in getting user Favourite:", error);
        return Response.json({Message : "getting user favourite recipes error."}, {status: 500})
    }
};