import db from "@/app/utils/database/db";
import pictureManager from "@/app/utils/pictureManage/picManager";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const rep_name = form.get("rep_name") as string;
    const rep_des = form.get("rep_des") as string;
    const calories = parseInt(form.get("calories") as string);
    const rep_date = form.get("rep_date") as string;
    const rep_time = form.get("rep_time") as string;
    const rep_step = form.get("rep_step") as string;
    const path = await pictureManager.savePicture(
      form.get("rep_img") as File,
      "/images/menuPic"
    );
    const connection = (await db.get())?.getConnection();
    const word = `INSERT INTO recipes value(default, '${rep_name}', '${rep_des}', '${calories}', '${rep_date}', default , '${path}' , '${rep_time}', '${rep_step}')`;
    console.log("word: ", word);
    await (await connection)?.query(word);
    (await connection)?.release();
    return Response.json({ message: path }, { status: 201 });
  } catch {
    Error;
  }
  {
    console.log("error5: ", Error);
    return Response.json(
      {
        error: Error,
      },
      { status: 500 }
    );
  }
}
