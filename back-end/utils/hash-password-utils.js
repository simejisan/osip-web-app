const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

function hash_password(password) {
    let saltRounds = process.env.SALT_ROUND;

    let salt = bcrypt.genSaltSync(parseInt(saltRounds, 10));
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

function compare_password(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hash_password,
    compare_password,
}