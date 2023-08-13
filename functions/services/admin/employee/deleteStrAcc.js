//import database connection
const Connection = require('../../../database/connection')

module.exports = async (id) => {
    try {
        const query = `DELETE FROM ` +
                        `empstat2 ` +
                      `WHERE ` +
                        `ID = '${id}' AND type=1`

    const result = await Connection(query)
    return result
    } catch (err) {
        return err
    }
}