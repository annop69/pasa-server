//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (empID, type, pageNumber, pageSize) => {
    let offset_value = (pageNumber - 1 ) * pageSize
    try {
        const query = `SELECT *, (SELECT COUNT(*) FROM empstat1 WHERE empID = ${empID} AND type = ${type}) AS totalItems FROM empstat1 WHERE empID = ${empID} AND type = ${type} LIMIT ${pageSize} OFFSET ${offset_value}`

        const results = await connection(query)
        return results
    } catch (err) {
        return err
    }
}



