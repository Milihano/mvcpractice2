const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';


const hashingPasswords = (password) => {
    new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    reject(err)
                }
                resolve([hash,salt])
            });
        })  
    })
}


module.exports = {hashingPasswords}