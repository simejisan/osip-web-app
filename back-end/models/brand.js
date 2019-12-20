const db = require("../database/database");

const saveBrandToDb = (brand) => {
    return new Promise((resolve, reject) => {
        db.query('insert into brand (name, description, image) values ($1, $2, $3)', [brand.name, brand.description, brand.image],(error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const getBrandInfo = (brand) => {
    return new Promise((resolve, reject) => {
        db.query('select * from brand where name = $1 and description = $2 and image = $3', [brand.name, brand.description, brand.image],(error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const getBrandInfoById = (brand_id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from brand where id = $1', [brand_id],(error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}
module.exports = {
    saveBrandToDb,
    getBrandInfo,
    getBrandInfoById
}