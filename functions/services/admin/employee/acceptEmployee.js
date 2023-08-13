//import database connection
const connection = require('../../../database/connection')

//export class
module.exports = async (id) => {
    console.log(id)
    try{
        const query = `UPDATE employees SET is_pending = 0 WHERE id = ${id}`

        const result = await connection(query);
        return result;
    }
    catch(err){
        return err;
    }
}