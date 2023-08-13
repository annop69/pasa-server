//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1 ) * pageSize
    try {
        const query = `SELECT *, (SELECT COUNT(*) from employees WHERE is_pending = 0) AS totalItems FROM employees AS items WHERE is_pending = 0 LIMIT ${pageSize} OFFSET ${offset_value}`

        const results = await connection(query)
        return results
    } catch (err) {
        return err
    }
}



