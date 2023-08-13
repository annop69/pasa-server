//import database connection
const Connection = require('../../../database/connection')

module.exports = async (id) => {
    console.log(id)
    try {
        const query = `DELETE FROM ` +
                        `adminuser ` +
                      `WHERE ` +
                        `ID = '${id}'`

    const result = await Connection(query)
    return result
    } catch (err) {
        return err
    }
}