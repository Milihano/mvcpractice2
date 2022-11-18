const { v4: uuidv4 } = require('uuid')
const { Op } = require("sequelize")
const {CustomerValidation} = require('../validations/customer')
const {sendingSms} = require('../services/smsservice')
const {generateOtp} = require('../utils/otpgeneration');
const customer = require('../models/customer')
const {hashingPasswords} = require('../utils/hashpassword')






const validatingAndCollectionOfInputs = (req,res) => {

    const {error,value} = CustomerValidation(req.body)
    if (error != undefined) {
        res.status(400).send({
            status: false,
            message: error
        })
    }

    const{firstname, lastname, email, phone, password, repeat_password} = req.body

    const otpHolder = generateOtp()
    const customer_id = uuidv4()

    try {
        customer.findAll({
            where: {
                [Op.or]: [
                    { email: email },
                    { phone: phone }
                ]
            }
        })
        return hashingPasswords(password)

        .then(([hash, salt]) => {

            return customer.create({
                customer_id: customer_id,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                passwordhash: hash,
                passwordsalt: salt,
            })
        })

        .then((data)=>{
            if (data.length > 0) {
                throw new Error (`A User With This Email Or Password Already Exists`)
            }
        })
        .then((OtpInsert)=>{
            otp.create({
                firstname:firstname,
                lastname:lastname,
                phone: phone,
                otp: otpHolder
            })
        })
        .then((sendingOTP)=>{
            sendingSms(phone, `Hello ${firstname} ${lastname},Your OTP IS ${otpHolder} For Mujib.Limited Company \n Do Not Share This!`)
        })
        .then((message)=>{
            res.status(200).send({
                status:true,
                message:"Otp Has Been Sent To Your Phone \n Otp Will Expire In 7mins"
            })
        })
        .catch((error)=>{
            res.status(400).send({
                message:error
            })
        })
    } catch (error) {
        res.status(400).send({
            message:error
        })
    }
}

const verifyPhoneOtp = (req, res)=>{
    const {phone, otpHolder } = req.params
    try {
        otp.findAll({
            where: {
                phone: phone,
                otp: otpHolder
            },
            attributes: [ 'otp', 'phone', 'createdAt'], 
        })
        .then((dataotp)=>{
            if (dataotp.length == 0) throw new Error('Invalid OTP')

            const timeOtpWasSent = Date.now() - new Date(dataotp[0].dataValues.createdAt)
        
            const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute

            if (convertToMin > process.env.OTPExpirationTime) throw new Error('OTP has expired')
        })
        .then((phoneverifiedData) => { 
            return otp.destroy({
                where: {
                    otp: otpHolder,
                    phone: phone
                }
            })
        })
        .then((data5) => {
            res.status(200).send({
                status: true,
                message: 'OTP verified. Welcome'
            })
        })      
    } catch (error) {
        res.status(400).send({
            status:false,
            message:error
        })
    }
    
    
}














module.exports = { validatingAndCollectionOfInputs, verifyPhoneOtp }