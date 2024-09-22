import mysql from "mysql2/promise";
export const mysqlPool = mysql.createConnection({
    host : '161.246.38.35',
    user : 'it66070234',
    password : 'UKEvgw21',
    database : 'it66070234_GourmetGuide',
    connectTimeout: 1000000000
})
