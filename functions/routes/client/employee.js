const express = require('express')
const router = express.Router()
const { checkToken } = require('../../../functions/auth/token_validation')
const { genSaltSync, hashSync } = require('bcryptjs')

//Admin services
const getEmployeesService = require('../../services/admin/employee/getEmployees')
const getEmployeeService = require('../../services/admin/employee/getEmployee')
const getPendingEmployeesService = require('../../services/admin/employee/getPendingEmployees')
const getPendingEmployeeService = require('../../services/admin/employee/getPendingEmployee')
const deleteEmployeeService = require('../../services/admin/employee/deleteEmployee')
const acceptEmployeeService = require('../../services/admin/employee/acceptEmployee')
const updateEmployeeRatingService = require('../../services/admin/employee/updateRating')
const addEmployeeStrAcc = require('../../services/admin/employee/addStrAcc')
const getStrAcc = require('../../services/admin/employee/getStrAcc')
const deleteStrAcc = require('../../services/admin/employee/deleteStrAcc')
const getCommFeed = require('../../services/admin/employee/getCommFeed')
const addCommFeed = require('../../services/admin/employee/addCommFeed')
const deleteCommFeed = require('../../services/admin/employee/deleteCommFeed')
const getEmpStat = require('../../services/admin/employee/getEmployeeStats')
const addEmpStat = require('../../services/admin/employee/addEmployeeStats')
const deleteEmpStat = require('../../services/admin/employee/deleteEmployeeStats')
const getsearchEmpStat = require('../../services/admin/employee/getsearchEmpStat')
const updateEmpStat = require('../../services/admin/employee/updateEmpStat')
const getCurrentEmpUser = require('../../services/client/getCurrentEmpUser')
const registerUser = require('../../services/client/registerUser');


//Add new Employee routes
router.post('/register', async (req, res) => {
    let { firstName, lastName, email, password, is_pending } = req.body
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    const results = await registerUser(firstName, lastName, email, password, is_pending)
    if(results){
        res
            .status(201)
            .send({
                status: results,
                message: 'User is successfully added!'
            })
    }else{
        res
            .status(501)
            .send({
                status: results
            })
    }
})

//GET Employees routes
router.get('/employees', checkToken, async (req, res) => {
    let { pageNumber, pageSize} = req.query
    const results = await getEmployeesService(pageNumber, pageSize)


    if(results && results.length <= 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: 0
            })
    }
    else if(results && results.length > 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: results[0].totalItems
            })
    }
    else{
        res
            .status(500)
            .send({
                status: results
            })
    }
})

//GET Employee routes
router.get('/employee', checkToken, async (req, res) => {
    let { params, pageNumber, pageSize} = req.query
    const results = await getEmployeeService(params, pageNumber, pageSize)

    if(results && results.length > 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: results[0].totalItems
            })
    }else if(results && results.length <= 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: 0
            })
    }else{
        res
            .status(500)
            .send({
                status: results
            })
    }
})

//GET Pending Employees routes
router.get('/pending-employees', checkToken, async (req, res) => {
    const { pageNumber, pageSize } = req.query
    const results = await getPendingEmployeesService(pageNumber, pageSize)

    if(results && results.length > 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: results[0].totalItems
            })
    }
    else if(results && results.length <= 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: 0
            })
    }
    else{
        res
            .status(500)
            .send({
                status: results
            })
    }
})

//GET Pending Employee routes
router.get('/pending-employee', checkToken, async (req, res) => {
    const { params, pageNumber, pageSize } = req.query
    const results = await getPendingEmployeeService(params, pageNumber, pageSize)

    if(results && results.length > 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: results[0].totalItems
            })
    }
    else if(results && results.length <= 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: 0
            })
    }
    else{
        res
            .status(500)
            .send({
                status: results
            })
    }
})

//Update Employee status routes

router.patch('/accept-employee', checkToken, async (req, res) => {
    const { id } = req.body
    const results = await acceptEmployeeService(id);

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Employee info successfully updated!"
            });
    }
    else{
        res
            .status(501)
            .send({
                status: results
            });
    }

})


//DELETE Employee routes
router.delete('/delete-employee', checkToken, async (req, res) => {
    const { id } = req.body

    const results = await deleteEmployeeService(id)

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully deleted the employee!"
            })
    }else{
        res
            .status(501)
            .send({
                message: "Unable to Delete the User"
            })
    }
})

//UPDATE employee rating routes
router.patch('/update-rating', checkToken, async (req, res) => {
    const fields = req.body
    const results = await updateEmployeeRatingService(fields);

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully added the rating!"
            });
    }
    else{
        res
            .status(501)
            .send({
                status: results
            });
    }

})

//Get Strengths/Accomplishment routes
router.get('/get-str-acc', checkToken, async (req, res) => {
    const { empID } = req.query
    const results = await getStrAcc(empID)

    if(results && results.length > 0){
        res
            .status(200)
            .send({
                results
            })
    }
    else if(results && results.length <= 0){
        res
            .status(200)
            .send({
                results
            })
    }
    else{
        res
            .status(500)
            .send({
                status: results
            })
    }
})

//Add Strengths/Accomplishments routes
router.post('/add-str-acc', checkToken, async (req, res) => {
    const {empID, descr} = req.body
    const results = await addEmployeeStrAcc(empID, descr);

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully added the data!"
            });
    }
    else{
        res
            .status(501)
            .send({
                status: results
            });
    }

})

//DELETE Strengths/Accomplishments routes
router.delete('/delete-str-acc', checkToken, async (req, res) => {
    const { id } = req.body

    const results = await deleteStrAcc(id)

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully deleted Strength/Accomplishment!"
            })
    }else{
        res
            .status(501)
            .send({
                message: "Unable to Delete Strength/Accomplishment"
            })
    }
})

//GET Comments/Feedback routes
router.get('/get-com-fed', checkToken, async (req, res) => {
    const { empID } = req.query
    const results = await getCommFeed(empID)

    if(results && results.length > 0){
        res
            .status(200)
            .send({
                results
            })
    }
    else if(results && results.length <= 0){
        res
            .status(200)
            .send({
                results
            })
    }
    else{
        res
            .status(500)
            .send({
                status: results
            })
    }
})

//Add Comments/Feedback routes
router.post('/add-com-fed', checkToken, async (req, res) => {
    const {empID, descr} = req.body
    const results = await addCommFeed(empID, descr);

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully added the data!"
            });
    }
    else{
        res
            .status(501)
            .send({
                status: results
            });
    }

})

//DELETE Comments/Feedback routes
router.delete('/delete-com-fed', checkToken, async (req, res) => {
    const { id } = req.body

    const results = await deleteCommFeed(id)

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully deleted Comments/Feedback!"
            })
    }else{
        res
            .status(501)
            .send({
                message: "Unable to Delete Comments/Feedback"
            })
    }
})

//GET Employees stat
router.get('/get-empstat', checkToken, async (req, res) => {
    const { empID, type, pageNumber, pageSize } = req.query
    const results = await getEmpStat(empID, type, pageNumber, pageSize)

    if(results && results.length <= 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: 0
            })
    }
    else if(results && results.length > 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: results[0].totalItems
            })
    }else{
        res
            .status(501)
            .send({
                status: results
            })
    }
})

//GET Employee stat
router.get('/get-searchEmpStat', checkToken, async (req, res) => {
    const { query, empID, type, pageNumber, pageSize } = req.query
    const results = await getsearchEmpStat(query, empID, type, pageNumber, pageSize)

    if(results && results.length <= 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: 0
            })
    }
    else if(results && results.length > 0){
        res
            .status(200)
            .send({
                items: results,
                totalItems: results[0].totalItems
            })
    }else{
        res
            .status(501)
            .send({
                status: results
            })
    }
})

//GET Current User
router.get('/current-empuser', checkToken, async(req, res) => {
    const {email} = req.query
    console.log(email)
    const result = await getCurrentEmpUser(email)
    console.log(result)

    if(result){
        res
            .status(200)
            .send({details: result})
    }else{
        res 
            .status(501)
            .send({status: result})
    }
})

//Add Employee stat
router.post('/add-empstat', checkToken, async (req, res) => {
    const {empID, type, ticket_id, descr} = req.body
    const results = await addEmpStat(empID, type, ticket_id, descr);

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully added the data!"
            });
    }
    else{
        res
            .status(501)
            .send({
                status: results
            });
    }

})

//DELETE Employee stat
router.delete('/delete-empstat', checkToken, async (req, res) => {
    const { id } = req.body

    const results = await deleteEmpStat(id)

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Successfully deleted the data"
            })
    }else{
        res
            .status(501)
            .send({
                message: "Unable to Delete the data"
            })
    }
})

//Edit Employee stat

router.patch('/update-empstat', checkToken, async (req, res) => {
    const { id, ticket_id, descr } = req.body
    const results = await updateEmpStat(id, ticket_id, descr);

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Employee info successfully updated!"
            });
    }
    else{
        res
            .status(501)
            .send({
                status: results
            });
    }
})


//export router class
module.exports = router