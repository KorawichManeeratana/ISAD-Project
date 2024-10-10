import { qb } from "@/app/utils/database/qb";

export async function POST(req: any) {
    try {
      let {rep_id} = await req.json()
      let data = await qb.selectFrom("recipes").selectAll().where("recipes.rep_id", "=", rep_id).execute();
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