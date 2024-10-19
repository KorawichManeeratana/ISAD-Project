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
    const rep_id = form.get("rep_id") as string;
    const checkpath = form.get("rep_img") as string;
    let path;
    if(checkpath !== 'undefined'){
      path = await pictureManager.savePicture(
        form.get("rep_img") as File,
        "/images/menuPic"
      );
    }
    if (checkpath !== 'undefined'){
      await qb.updateTable("recipes").set({rep_name : rep_name, rep_des: rep_des, calories: calories, rep_img: path, rep_time: rep_time, rep_step : rep_step, rep_ing: rep_ing}).where("recipes.rep_id", "=", parseInt(rep_id)).execute();
    return Response.json({Message : "Update Recipe Success!!"}, { status: 201 });
    }else{
      await qb.updateTable("recipes").set({rep_name : rep_name, rep_des: rep_des, calories: calories, rep_time: rep_time, rep_step : rep_step, rep_ing: rep_ing}).where("recipes.rep_id", "=", parseInt(rep_id)).execute();
    return Response.json({Message : "Update Recipe Success!!"}, { status: 201 });
    }
    
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