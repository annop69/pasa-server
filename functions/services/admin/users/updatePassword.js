//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (id, password) => {
    try {
        const query = `UPDATE ` +
                        `adminuser ` +
                        `SET ` +
                        `password = '${password}' ` +
                        `WHERE ` +
                            `id = '${id}'`
        const result = await Connection(query)
        return result
    } catch (err) {
        return err
    }
}