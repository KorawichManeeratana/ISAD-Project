"use server"

import user from "./loginSystem"
import token from "./tokenManage"
import userlogout from "./logoutSystem"

export async function checkLoginAction(email: string, password: string) {
    return await user.checkLogin(email, password);
}

export async function checkAccessTokenExist(access: string){
    return await token.checkAccessToken(access);
}

export async function Logout(){
    return userlogout.delCookies();
}