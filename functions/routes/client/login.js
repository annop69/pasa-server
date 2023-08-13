require("dotenv").config();
const express = require('express')
const router = express.Router()
const { compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

//service
const loginUserService = require('../../services/client/loginEmployee');

//login route
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const results = await loginUserService(email);
    if(results){
        const comparePassword = compareSync(password, results.password);
        if(comparePassword){
            comparePassword.password = undefined;
                const jsontoken = sign({ comparePassword: results}, process.env.SECRET_KEY, {
                    expiresIn: "5h"
                });
                res
            .status(201)
            .send({
                message: 'login successfully',
                status: results,
                token: jsontoken
            })
        }else{
            res
                .status(401)
                .send({
                    message: "Invalid email or password"
                })
        }
    }
    else{
        res
            .status(401)
            .send({
                message: "Invalid email or password"
            })
    }
})

//export router class
module.exports = router