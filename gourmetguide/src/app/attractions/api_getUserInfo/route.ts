import { NextResponse } from "next/server";
import db from "@/app/utils/database/db";
import { error } from "console";
import { isInt16Array } from "util/types";
const bcrypt = require("bcrypt");
import { qb } from "@/app/utils/database/qb";

export async function POST(req: Response) {
  const ac_id = await req.json();
  try {
    let data = await qb
      .selectFrom("account")
      .innerJoin("recipes", "account.ac_id", "recipes.ac_id")
      .select(["recipes.rep_id","account.username", "account.userPFP", "account.profile_des", "recipes.rep_img", "account.email", "account.ac_id"])
      .where("account.ac_id", "=", parseInt(ac_id.ac_id)).execute();
      console.log(data)
    return Response.json(data, { status: 201 });
  } catch (error) {
    console.log("Fetching user data Failed.");
    return Response.json(
      { Message: "Fetch user Info failed" },
      { status: 500 }
    );
  }
}
