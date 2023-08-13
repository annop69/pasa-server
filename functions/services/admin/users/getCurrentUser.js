//import database connection
const connection = require('../../../database/connection')

//export class
module.exports = async (email) => {
    try{
        const query = `SELECT * FROM adminuser WHERE email LIKE '%${email}%'`
        const result = await connection(query)
        return result
    }
    catch(err){
        return err;
    }
}