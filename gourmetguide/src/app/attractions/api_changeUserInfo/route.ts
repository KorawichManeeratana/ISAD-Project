import { NextResponse } from "next/server";
import db from "@/app/utils/database/db";
import { error } from "console";
import { isInt16Array } from "util/types";
const bcrypt = require("bcrypt");
import { qb } from "@/app/utils/database/qb";

export async function POST(req: Response) {
  const { username, profile_des, email, ac_id } = await req.json();
  try {

    if(username && profile_des && email){
        await qb.updateTable("account").set({username : username, email : email, profile_des : profile_des}).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }

    if(username && profile_des && !email){
        await qb.updateTable("account").set({username : username, profile_des : profile_des}).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }

    if(username && email && !profile_des){
        await qb.updateTable("account").set({username : username, email : email}).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }

    if (username && !email && !profile_des){
        await qb.updateTable("account").set("account.username", username).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }

    if(profile_des && !username && !email){
        await qb.updateTable("account").set("account.profile_des", profile_des).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }

    if(email && !profile_des && !username){
        await qb.updateTable("account").set("account.email", email).where("ac_id", "=", ac_id).execute();
        return Response.json({Message : "Update Information Success!"}, {status : 201})
    }

    
  } catch (error) {
    console.log("Fetching user data Failed.");
    return Response.json(
      { Message: "Fetch user Info failed" },
      { status: 500 }
    );
  }
}