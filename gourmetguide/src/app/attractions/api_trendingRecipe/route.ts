import { qb } from "@/app/utils/database/qb";

export async function POST(req: any) {
    try {
      let data = await qb.selectFrom("recipes").selectAll().orderBy("recipes.likes desc").limit(3).execute();
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