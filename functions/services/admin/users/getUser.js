//import database connection
const connection = require('../../../database/connection')

//export class
module.exports = async (params, pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1) * pageSize
    try {
        const query = `SELECT ` +
                        `*, ` +
                        `(SELECT COUNT(*) FROM adminuser WHERE (firstName LIKE '%${params}%') OR 
                        (lastName LIKE '%${params}%') OR 
                        (username LIKE '%${params}%') OR
                        email LIKE '%${params}%') AS totalItems ` +
                       `FROM ` +
                        `adminuser ` +
                       `WHERE ` +
                        `(firstName LIKE '%${params}%') OR ` +
                        `(lastName LIKE '%${params}%') OR ` +
                        `(username LIKE '%${params}%') OR ` +
                        `(email LIKE '%${params}%') ` +
                        `LIMIT ${pageSize} OFFSET ${offset_value}`

        const results = await connection(query);
        return results
    } catch (err) {
        return err
    }
}



