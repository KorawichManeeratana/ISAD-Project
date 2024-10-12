import db from '@/app/utils/database/db'
import tokenManage from "./tokenManage";
import { cookies } from 'next/headers'
const bcrypt = require('bcrypt')
import { redirect } from "next/navigation";
import { qb } from '../database/qb';

const cookie = cookies();

export default class deleteCookie{
    public static delCookies(){
        cookie.set('token', '', {
            httpOnly: true,
            maxAge: 0, // 0 second hours in seconds
          })
          redirect('/');
    }
    
}