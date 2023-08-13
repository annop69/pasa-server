//import database connection
const Connection = require('../../database/connection')

//export class
module.exports = async (email) => {
    try {
        const query = `SELECT ` +
                        `* ` +
                       `FROM ` +
                        `employees ` +
                       `WHERE ` +
                        `email = '${email}' AND is_pending = 0`

        const results = await Connection(query)
        return results[0]
    }
    catch (err) {
        return err
    }
}