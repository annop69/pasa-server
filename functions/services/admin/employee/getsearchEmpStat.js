//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (params, empID, type, pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1 ) * pageSize
    try {
        const query = `SELECT ` +
                        `*, ` +
                        `(SELECT COUNT(*) from empstat1 WHERE (ticket_id LIKE '%${params}%' OR 
                        descr LIKE '%${params}%') AND empID = ${empID} AND type = ${type}) as totalItems ` +
                       `FROM ` +
                        `empstat1 as items ` +
                        `WHERE (ticket_id LIKE '%${params}%' OR 
                        descr LIKE '%${params}%') AND empID = ${empID} AND type = ${type} ` +
                        `LIMIT ${pageSize} OFFSET ${offset_value}`

        const result = await connection(query)
        console.log("results", result)
        return result
    } catch (err) {
        return err
    }
}



