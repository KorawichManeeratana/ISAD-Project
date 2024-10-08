import db from "@/app/utils/database/db";

export async function POST(req: Response) {
  try {
    const connection = (await db.get())?.getConnection();
    const { search } = await req.json();
    console.log("Search:", search);
    let command = `SELECT * FROM recipes JOIN account ON (recipes.ac_id = account.ac_id) WHERE rep_name LIKE "%${search}%"`;
    console.log("command :", command);
    const data: any = await (await connection)?.query(command);
    (await connection)?.release();
    if (data?.length > 0){
      return Response.json(data, { status: 201 });
    }else{
      return Response.json({Message: "ไม่พบสูตรอาหาร"}, {status: 201});
    }
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

export async function POSTSENSITIVE(req: Response) {
  try {
    const connection = (await db.get())?.getConnection();
    const {search} = await req.json();
    console.log("Search:", search);
    let command = `SELECT * FROM recipes JOIN account ON (recipes.ac_id = account.ac_id) WHERE rep_name LIKE "%${search}%"`;
    console.log("command :", command);
    const data : any = await (await connection)?.query(command);
    (await connection)?.release();
    if (data?.length > 0){
      return Response.json(data, { status: 201 });
    }else{
      return Response.json({Message: "ไม่พบสูตรอาหาร"}, {status: 201});
    }
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
