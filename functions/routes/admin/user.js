const express = require('express')
const router = express.Router()
const { genSaltSync, hashSync } = require('bcryptjs')
const { checkToken } = require('../../../functions/auth/token_validation')

//services
const getUsersService = require('../../services/admin/users/getUsers')
const getUserService = require('../../services/admin/users/getUser')
const getCurrentUser = require('../../services/admin/users/getCurrentUser')
const addUserService = require('../../services/admin/users/addUser')
const updateUserService = require('../../services/admin/users/updateUser')
const updatePasswordService = require('../../services/admin/users/updatePassword')
const deleteUserService = require('../../services/admin/users/deleteUser')


//GET Users routes
router.get('/users', checkToken, async (req, res) => {
    const { pageNumber, pageSize } = req.query
    const results = await getUsersService(pageNumber, pageSize)

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

//GET User routes
router.get('/user', checkToken, async (req, res) => {
    const { query, pageNumber, pageSize } = req.query
    const results = await getUserService(query, pageNumber, pageSize)

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
router.get('/current-user', checkToken, async(req, res) => {
    const {email} = req.query
    const result = await getCurrentUser(email)

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

//Add new User routes
router.post('/add-user', checkToken, async (req, res) => {
    let { firstName, lastName, username, email, password, is_suspended } = req.body
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    const results = await addUserService(firstName, lastName, username, email, password, is_suspended)
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


//Update User routes
router.patch('/update-user', checkToken, async (req, res) => {
    let { id, firstName, lastName, username, email, is_suspended } = req.body
    const results = await updateUserService({id, firstName, lastName, username, email, is_suspended})
    
    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "User info successfully updated!"
            })
    }else{
        res
            .status(501)
            .send({
                status: results
            })
    }
})

//Update User Password
router.patch('/update-password', checkToken, async (req, res) => {
    let { id, password } = req.body
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    const results = await updatePasswordService(id, password)
    
    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                message: "Password successfully updated!"
            })
    }else{
        res
            .status(501)
            .send({
                status: results
            })
    }
})


//Delete User routes
router.delete('/delete-user', checkToken, async (req, res) => {
    const { id } = req.body
    
    const results = await deleteUserService(id)

    if(results.affectedRows > 0){
        res
            .status(200)
            .send({
                status: results,
                message: "Successfully deleted the User!"
            })
    }else{
        res
            .status(501)
            .send({
                message: "Unable to Delete the User"
            })
    }
})


//export router class
module.exports = router



