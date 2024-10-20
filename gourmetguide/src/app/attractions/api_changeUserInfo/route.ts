import { NextResponse } from "next/server";
import db from "@/app/utils/database/db";
import { error } from "console";
import { isInt16Array } from "util/types";
const bcrypt = require("bcrypt");
import { qb } from "@/app/utils/database/qb";
import pictureManager from "@/app/utils/pictureManage/picManager";

export async function POST(req: Response) {
  const form = await req.formData()
  const username = form.get("username") as string;
  const profile_des = form.get("profile_des") as string;
  const email = form.get("email") as string;
  const ac_id = parseInt(form.get("ac_id") as string);
  const checkpath = form.get("profile_img") as string;
  
  let path;
  if(checkpath !== 'undefined'){
     path = await pictureManager.savePicture(
      form.get("profile_img") as File,
      "/images/clientPFP"
    );
  }
  
  try {
    if(checkpath !== 'undefined'){
      await qb.updateTable("account").set({username : username, email : email, profile_des : profile_des, userPFP: path}).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }else{
      await qb.updateTable("account").set({username : username, email : email, profile_des : profile_des}).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }
        
  } catch (error) {
    console.log("Update user data Failed.", error);
    return Response.json(
      { Message: "Update user Info failed" },
      { status: 500 }
    );
  }
}