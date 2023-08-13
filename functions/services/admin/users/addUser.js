//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (firstName, lastName, username, email, password, is_suspended) => {
    try {
        const query = `INSERT INTO ` +
                        `adminUser ` +
                      `VALUES ` +
                        `(null, '${firstName}', '${lastName}', '${username}', '${email}', '${password}', b'${is_suspended}')`

        const results = await Connection(query)
        return true
    } catch (err) {
        return err
    }
}