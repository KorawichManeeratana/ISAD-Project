import db from "@/app/utils/database/db";
import { qb } from "@/app/utils/database/qb";

export async function POST(req: Response) {
  try {
    let {
      search,
      minValue,
      maxValue,
      minTime,
      maxTime,
    }: {
      search: string;
      minValue: number;
      maxValue: number;
      minTime: number;
      maxTime: number;
    } = await req.json();
    const newSearch = search.split(",");
    console.log("Search:", search);
    let query = qb
      .selectFrom("recipes")
      .innerJoin("account", "recipes.ac_id", "account.ac_id")
      .select([
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
        "recipes.likes"
      ])
      .where((eb) =>
        eb.or([
          ...newSearch.map((word) =>
            eb("recipes.rep_name", "like", `%${word}%`)
          ),
          ...newSearch.map((word) =>
            eb("recipes.rep_ing", "like", `%${word}%`)
          ),
        ])
      );
    if (minTime && maxTime) {
      console.log("เข้า time", maxTime, minTime);
      query = query.where((eb) => eb.between("recipes.rep_time", minTime, maxTime));
    }
    if (minValue && maxValue) {
      console.log("เข้า calories", minValue, maxValue);
      query = query.where((eb) => eb.between("recipes.calories", minValue, maxValue));
    }
    let result = await query.execute();
    console.log("result:", result);
    
    if (result?.length > 0) {
      return Response.json(result, { status: 201 });
    } else {
      return Response.json({ Message: "ไม่พบสูตรอาหาร" }, { status: 201 });
    }
  } catch (error) {
    console.log("error: ", error);
    return Response.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

