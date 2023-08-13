//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (empID, desc) => {
    
    try {
        const query = `INSERT INTO ` +
                        `empstat2 ` +
                      `VALUES ` +
                        `(null, '${empID}', '${desc}', 2)`

        const result = await Connection(query)
        return result
    } catch (err) {
        return err
    }
}