const Joi = require('joi');

const CustomerValidation = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().max(12).required()
})




module.exports = CustomerValidation