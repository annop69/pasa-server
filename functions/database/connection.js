require("dotenv").config();
//create connection to the database
const mysql = require('mysql')
const dbConfig = {
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.MYSQL_DB
}
const db = mysql.createPool(dbConfig)

//export class
module.exports = (query) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, sql) => {
            if(err){
                console.log("Database error: ", err)
                reject(err)
            }else{
                sql.query(query, (err, results) => {
                    console.log("Query error: ", err)
                    if(err){
                        reject(err)
                    }else{
                        resolve(results)
                    }
                })
                sql.release()
            }
        })
    })
}
