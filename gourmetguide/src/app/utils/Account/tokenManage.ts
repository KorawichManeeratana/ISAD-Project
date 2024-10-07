const jwt = require('jsonwebtoken');
require('dotenv').config();
import db from "@/app/utils/database/db";

export default class tokenManage {
    public constructor() {}

    public static async getNewToken(ac_id: number, user_role: string): Promise<{access: string, refresh: string}> {
        const userInfo = {
            id: ac_id,
            role: user_role
        }
        const access: string = jwt.sign(userInfo, process.env.ACCESS_JWTSECRET, { expiresIn: '1h' });
        const refresh: string = jwt.sign(userInfo, process.env.REFRESH_JWTSECRET);
        let connection;

        try {
            connection = (await db.get())?.getConnection();
            await (await connection)?.execute(`UPDATE account SET token=? WHERE ac_id=?`, [refresh, ac_id])
        } catch (error) {
            console.log("getNewToken Failed!!");
        } finally {
            if (connection) (await connection).release();
        }

        return {access, refresh};
    }

    public static async checkRefreshToken(refresh: string): Promise<Boolean> {
        let connection;
        try {
            connection = (await db.get())?.getConnection();
            const refreshData = jwt.verify(refresh, process.env.REFRESH_JWTSECRET);
            const userToken : any = await (await connection)?.execute(`SELECT token FROM account WHERE ac_id=?`, [refreshData.id])

            if (refresh === userToken[0].token) { return true }

            else { return false }

        } catch (error) {
            console.log("Token Error");
            return false;
        }finally {
            if (connection) (await connection).release();
        }
    }
}