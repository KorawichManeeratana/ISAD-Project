import { mysqlPool } from '@/app/utils/database/dbConnect'
import { error } from 'console';
import { getToken } from 'next-auth/jwt';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(req: any) {
    let connection;
    try {
        connection = await mysqlPool;
        const { name, password }: { name: string, password: string } = await req.json();
        const userPasswordUncrypt = await getValue(connection, `SELECT password FROM account WHERE email=? OR username=?`, [name, name]);
        console.log(userPasswordUncrypt)

        if (!userPasswordUncrypt) {
            return Response.json({ isMatch: false }, { status: 401 });
        }

        let isMatch: Boolean = await bcrypt.compare(password, userPasswordUncrypt);
        console.log("is Match:", isMatch);
        const token : any = jwt.sign({username : name}, process.env.ACCESS_JWTTOKEN, {expiresIn: "1h"})
        return Response.json({ isMatch }, { status: 201 });
        
    } catch (error) {
        console.log("error:", error);
        return Response.json({
            error: error
        }, { status: 500 });
    } finally {
        if (connection) connection.end();
    }
}

async function getValue(connection: any, query: string, params: any[]) {
    try {
        const [rows] = await connection.query(query, params);
        if (rows.length > 0) {
            return rows[0].password;
        } else {
            console.log('No results found');
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}