//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (id, ticket_id, descr) => {

    try {
        const query = `UPDATE ` +
                        `empstat1 ` +
                        `SET ` +
                            `ticket_id = '${ticket_id}', descr = '${descr}' ` +
                        `WHERE ` +
                            `ID = '${id}'`
        const result = await Connection(query)
        return result
    } catch (err) {
        return err
    }
}