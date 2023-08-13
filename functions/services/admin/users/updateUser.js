//import database connection
const Connection = require('../../../database/connection')

//export class
module.exports = async (fields) => {

    //format field objects for sql query
    let arrFields = []
    let id = 0
    for(let key in fields){
        if(fields.hasOwnProperty(key)){
            if(`${key}` == "id"){
                id = `${fields[key]}`
            }
            if(`${key}` == "is_suspended"){
                arrFields += `${key} = b'${fields[key]}', `
            }
            else{
                arrFields += `${key} = '${fields[key]}', ` 
            }
        }
    }
    arrFields = arrFields.substring(0, arrFields.length-2)


    try {
        const query = `UPDATE ` +
                        `adminuser ` +
                        `SET ` +
                            `${arrFields}` +
                        `WHERE ` +
                            `id = '${id}'`
        const result = await Connection(query)
    } catch (err) {
        return err
    }
}