//import database connection
const Connection = require('../../../database/connection')

module.exports = async (id) => {
    try {
        const query = `DELETE FROM ` +
                        `empstat1 ` +
                      `WHERE ` +
                        `ID = '${id}'`

    const result = await Connection(query)
    return result
    } catch (err) {
        return err
    }
}