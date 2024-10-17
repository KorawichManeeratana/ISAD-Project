import db from "@/app/utils/database/db";

import { qb } from "@/app/utils/database/qb";
export async function POST(req: any) {
     try {
       let recipe = await qb.selectFrom("recipes")
       return Response.json(recipe, { status: 201 });

     } catch (error) {
       console.error("Database Error:", error);
       return Response.json({ error: "Database error" }, { status: 500 });
     }
   }