//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (params, pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1 ) * pageSize
    try {
        const query = `SELECT ` +
                        `*, ` +
                        `(SELECT COUNT(*) from employees WHERE (id LIKE '%${params}%' OR 
                        firstName LIKE '%${params}%' OR
                        lastName LIKE '%${params}%' OR
                        email LIKE '%${params}%') AND is_pending = 0) as totalItems ` +
                       `FROM ` +
                        `employees as items ` +
                        `WHERE (id LIKE '%${params}%' OR
                        firstName LIKE '%${params}%' OR
                        lastName LIKE '%${params}%' OR
                        email LIKE '%${params}%') AND is_pending = 0 ` +
                        `LIMIT ${pageSize} OFFSET ${offset_value}`

        const results = await connection(query)
        console.log(results)
        return results
    } catch (err) {
        return err
    }
}



