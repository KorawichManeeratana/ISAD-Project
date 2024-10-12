const jwt = require('jsonwebtoken');
require('dotenv').config();
import db from "@/app/utils/database/db";
import { qb } from "../database/qb";

export default class tokenManage {
    public constructor() {}

    public static async getNewToken(ac_id: number, user_role: string, userPFP: string): Promise<{access: string, refresh: string}> {
        const userInfo = {
            id: ac_id,
            role: user_role,
            PFP : userPFP
        }
        const access: string = jwt.sign(userInfo, process.env.ACCESS_JWTSECRET, { expiresIn: '1h' });
        const refresh: string = jwt.sign(userInfo, process.env.REFRESH_JWTSECRET);

        try {
            await qb.updateTable("account").set("account.token", refresh).where("account.ac_id", "=", ac_id).execute();
        } catch (error) {
            console.log("getNewToken Failed!!");
        }
        return {access, refresh};
    }

    public static async checkRefreshToken(refresh: string): Promise<Boolean> {
        try {
            const refreshData = jwt.verify(refresh, process.env.REFRESH_JWTSECRET);
            const userToken : any = await qb.selectFrom("account").select("account.token").where("account.ac_id", "=", refreshData.id).execute();

            if (refresh === userToken[0].token) { return true }

            else { return false }

        } catch (error) {
            console.log("Token Error");
            return false;
        }
    }

    public static async checkAccessToken(access: string): Promise<Boolean> {
        
        try {
            const accessData = jwt.verify(access, process.env.ACCESS_JWTSECRET);
            const userToken : any = await qb.selectFrom("account").select("account.token").where("account.ac_id", "=", accessData.id).execute();

            if(access === userToken[0].token) {return true}

            else {return false}
        }catch (error){
            console.log("Token Error");
            return false;
        }
    }
}