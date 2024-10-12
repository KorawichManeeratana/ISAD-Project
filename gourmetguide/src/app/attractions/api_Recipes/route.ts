import db from "@/app/utils/database/db";
import pictureManager from "@/app/utils/pictureManage/picManager";
import { qb } from "@/app/utils/database/qb";

export async function POST(req: Request) {
  
  try {
    const form = await req.formData();
    const rep_name = form.get("rep_name") as string;
    const rep_des = form.get("rep_des") as string;
    const calories = parseInt(form.get("calories") as string);
    const rep_time = parseInt(form.get("rep_time") as string);
    const rep_step = form.get("rep_step") as string;
    const rep_ing = form.get("rep_ing") as string;

    const path = await pictureManager.savePicture(
      form.get("rep_img") as File,
      "/images/menuPic"
    );

    await qb.insertInto("recipes").values({rep_name: rep_name, rep_des: rep_des, calories: calories, rep_date: formatDate(new Date()).toString(), rep_img : path, rep_time : rep_time, rep_step: rep_step, ac_id: 13, rep_ing: rep_ing}).execute();
    return Response.json({ message: path }, { status: 201 });
  } catch (error)
  {
    console.log("error5: ", error);
    return Response.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
function formatDate(date: Date) {
  let output: string;
  output = ([date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), (date.getDate().toString().padStart(2, "0"))].join('-'));
  return output;
  }