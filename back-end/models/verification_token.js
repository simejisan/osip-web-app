const db = require("../database/database");

const saveVerificationToDb = (token) => {
    return new Promise((resolve, reject) => {
        db.query('insert into verification_token (token) values ($1)', [token],(error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const checkVerification = (token) => {
    return new Promise((resolve, reject) => {
        db.query('select * from verification_token where token = $1 ', [token],(error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const deleteVerification = () => {
    return new Promise((resolve, reject) => {
        db.query(`delete from verification_token where created_at < NOW() - INTERVAL '10' MINUTE`,(error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
        })
    });
}


module.exports = {
    saveVerificationToDb,
    checkVerification,
    deleteVerification
}