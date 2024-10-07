import db from "@/app/utils/database/db";

export async function POST(req: Response) {
  try {
    const connection = (await db.get())?.getConnection();
    const { search } = await req.json();
    console.log("Search:", search);
    let command = `SELECT * FROM recipes WHERE rep_name LIKE "%${search}%"`;
    console.log("command :", command);
    const data = await (await connection)?.query(command);
    (await connection)?.release();
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
