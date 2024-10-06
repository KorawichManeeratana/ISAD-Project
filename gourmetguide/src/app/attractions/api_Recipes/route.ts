import { mysqlPool } from "@/app/utils/database/dbConnect";
import pictureManager from "@/app/utils/pictureManage/picManager";


export async function POST(req : Request){
    console.log("error1:", Error)
    const form = await req.formData() ;
    const rep_name = form.get("rep_name") as string
    const rep_des = form.get("rep_des") as string
    const calories = parseInt(form.get("calories") as string)
    const rep_date = form.get("rep_date") as string
    const likes = parseInt(form.get("likes") as string)
    const rep_time = parseInt(form.get("rep_time") as string)
    const rep_step = form.get("rep_step") as string
    console.log("error2:", Error)
    const path = await pictureManager.savePicture(form.get("pic") as File, "/images/menuPic")
    try {
        console.log("error.:", Error)
        const connection = await mysqlPool;
        const word = `INSERT INTO recipes value(default, '${rep_name}', '${rep_des}', '${calories}', '${rep_date}', '${likes}' , '${path}' , '${rep_time}', '${rep_step}')`
        console.log("word: ", word)
        await connection.execute(word)
        connection.end();
        console.log("error4:", Error)
        return Response.json({message: path}, {status: 201});
    } catch {Error}{
        console.log("error5: ", Error);
        return Response.json({
            error : Error
        }, { status: 500});
    }
}