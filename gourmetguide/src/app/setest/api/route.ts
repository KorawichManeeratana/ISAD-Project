// import {NextResponse} from 'next/server'
// import { mysqlPool } from '@/app/utils/database/dbConnect';

// const bcrypt = require("bcrypt");

// export async function GET(reqeust: NextResponse){
//     try {
//         const connect = await mysqlPool;
//         const data = await connect.execute(`SELECT rep_name FROM recipes`);

//         connect.end();
//         console.log("data", data);
//         return Response.json({data}, {status: 201});


//     } catch(error){
//         console.log("Error", error);
//     }
// }

