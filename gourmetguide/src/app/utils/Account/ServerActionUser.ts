"use server"

import user from "./loginSystem"

export async function checkLoginAction(email: string, password: string) {
    return await user.checkLogin(email, password);
}