import {NextResponse} from 'next/server'
import  { mysqlPool }  from '@/app/utils/db'
import { error } from 'console';

export async function GET(){
    try {
        const connection = await mysqlPool;
        const rows = await connection.execute('SELECT * FROM `recipes`')
        connection.end();
        return NextResponse.json(rows[0])
    } catch {error}{
        return NextResponse.json({
            error : error
        }, { status: 500});
    }
}