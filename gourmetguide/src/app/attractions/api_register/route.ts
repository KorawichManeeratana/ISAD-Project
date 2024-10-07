import { NextResponse } from "next/server";
import db from "@/app/utils/database/db";
import { error } from "console";
const bcrypt = require("bcrypt");

export async function POST(req: any) {
  try {
    const connection = (await db.get())?.getConnection();
    const { name, email, password } = await req.json();
    let bigga = await bcrypt.hash(password, 10);
    (await connection)?.execute(
      `INSERT INTO account value(default, '${name}', '${bigga}', '${email}', default, '${"user"}')`
    );
    (await connection)?.release();
    return Response.json({ message: "User registered." }, { status: 201 });
  } catch {
    error;
  }
  {
    console.log("error: ", error);
    return Response.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
