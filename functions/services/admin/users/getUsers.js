//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1) * pageSize
    try {
        const query = `SELECT *, (SELECT COUNT(*) FROM adminuser) AS totalItems FROM adminuser AS items 
        LIMIT ${pageSize} OFFSET ${offset_value}`;

        const results = await connection(query)
        return results
    } catch (err) {
        return err
    }
}



