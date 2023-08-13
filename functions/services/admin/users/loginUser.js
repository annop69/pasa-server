//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (email) => {
    try {
        const query = `SELECT ` +
                        `* ` +
                       `FROM ` +
                        `adminuser ` +
                       `WHERE ` +
                        `email = '${email}'`

        const results = await Connection(query)
        return results[0]
    }
    catch (err) {
        return err
    }
}