//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (empID, type, ticket_id, descr) => {
    
    try {
        const query = `INSERT INTO ` +
                        `empstat1 ` +
                      `VALUES ` +
                        `(null, '${empID}', '${type}', '${ticket_id}', '${descr}')`

        const result = await Connection(query)
        return result
    } catch (err) {
        return err
    }
}