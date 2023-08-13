//import database connection
const Connection = require('../../database/connection')

//export class
module.exports = async (firstName, lastName, email, password, is_pending) => {
    try {
        const query = `INSERT INTO ` +
                        `employees ` +
                      `VALUES ` +
                        `(null, '${firstName}', '${lastName}', '${email}', '${password}', b'${is_pending}', null, null, null, null, null, null, null)`

        const results = await Connection(query)
        return true
    } catch (err) {
        return err
    }
}