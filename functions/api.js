require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

//Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Admin login route
const AdminloginRoutes = require('./routes/admin/login')
app.use('/login', cors(), AdminloginRoutes)

//User login route
const ClientloginRoutes = require('./routes/client/login')
app.use('/emp-login', cors(), ClientloginRoutes)

//Users route
const usersRoutes = require('./routes/admin/user')
app.use('/user', cors(), usersRoutes)

//Employees route
const employeeRoutes = require('./routes/client/employee')
app.use('/employee', cors(), employeeRoutes)

app.listen(process.env.APP_PORT, () => {
    console.log("Listening to port: ", process.env.APP_PORT)
})