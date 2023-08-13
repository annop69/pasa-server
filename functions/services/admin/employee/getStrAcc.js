//import database connection
const connection = require('../../../database/connection')


//export class
module.exports = async (empID) => {
    try {
        const query = `SELECT * FROM empstat2 WHERE empID = ${empID} AND type = 1`

        const results = await connection(query)
        return results
    } catch (err) {
        return err
    }
}



