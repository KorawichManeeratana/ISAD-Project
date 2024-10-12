import { qb } from "@/app/utils/database/qb";

export async function POST(req: any) {
    try {
      let {rep_id} = await req.json()
      let data = await qb.selectFrom("recipes").innerJoin("account", "account.ac_id", "recipes.ac_id").select([
        "account.ac_id",
        "recipes.rep_id",
        "recipes.rep_name",
        "recipes.calories",
        "recipes.rep_date",
        "recipes.rep_des",
        "recipes.rep_img",
        "recipes.rep_step",
        "recipes.rep_time",
        "account.username",
        "account.userPFP",
        "recipes.rep_ing",
        "recipes.likes",
      ]).where("recipes.rep_id", "=", rep_id).execute();     
      return Response.json(data, { status: 201 });
    } catch {
      Error;
    }
    {
      console.log("error: ", Error);
      return Response.json(
        {
          error: Error,
        },
        { status: 500 }
      );
    }
  }