import { qb } from "@/app/utils/database/qb";

export async function POST(req : any){
    try{
        let {rep_id, isClick} = await req.json();
        console.log("isClick:", isClick)
        if(!isClick){
            await qb.updateTable("recipes").set((eb) => ({
                likes : eb(eb.selectFrom("recipes").select("likes").where("recipes.rep_id", "=", rep_id), "+", 1)
              })).where("recipes.rep_id", "=", rep_id).execute();
        }else {
            await qb.updateTable("recipes").set((eb) => ({
                likes : eb(eb.selectFrom("recipes").select("likes").where("recipes.rep_id", "=", rep_id), "-", 1)
              })).where("recipes.rep_id", "=", rep_id).execute();
        }
        return Response.json({Message: "Like Success!"}, {status: 201})
    }catch(error){
        console.log("error:", error)
        return Response.json({Message : "like failed"}, {status: 500})
    }
}