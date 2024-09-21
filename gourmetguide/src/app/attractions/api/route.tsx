import {NextResponse} from 'next/server'
// import { mysqlPool } from '@/app/utils/db'

export async function GET(){
    // const promisePool = mysqlPool.promise()
    // const [rows, fields] = await promisePool.query(
    //     `SELCET * FROM recipes;`
    // )
    const data = {
        "text" : "hello wordsad"
    }
    return NextResponse.json(data)
}