//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (params, pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1 ) * pageSize
    try {
        const query = `SELECT ` +
                        `*, (SELECT COUNT(*) from employees WHERE (firstName LIKE '%${params}%' OR
                        lastName LIKE '%${params}%' OR
                        email LIKE '%${params}%') AND is_pending = 1) AS totalItems ` +
                       `FROM ` +
                        `employees AS items ` +
                       `WHERE (firstName LIKE '%${params}%' OR lastName LIKE '%${params}%' 
                       OR email LIKE '%${params}%') AND is_pending = 1 LIMIT ${pageSize} OFFSET ${offset_value}`

        const results = await connection(query)
        return results
    } catch (err) {
        return err
    }
}