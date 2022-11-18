require('dotenv').config() //console.log(process.env)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.APPPORT
const router = require('./routes/customersignup')


app.use(bodyParser.json())

app.use(router)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


console.log(`Example app listening on port ${port}`)