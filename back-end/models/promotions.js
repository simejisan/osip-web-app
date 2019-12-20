const db = require("../database/database");

// Get hotword in DB
const getAllPromotionInDb = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM promotions ', (error, results) => {
        if (error) {
          console.log("Error: ", error);
          reject(error);
        }
        resolve(results.rows)
      })
    });
}

const getPromotionInDb = (sort_type, screen_type, province, offset, limit) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM promotions where sort_type = $1 and screen_type = $2 and province = $3 offset $4 limit $5', [sort_type, screen_type, province, offset, limit], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const getPromotionInfo = (promotion) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM promotions where title = $1 and brand_id = $2 and store = $3 and number_of_percent_deal = $4 and rating = $5', [promotion.title, promotion.brand_id, promotion.store, promotion.number_of_percent_deal, promotion.rating], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const savePromotionToDb = (promotion) => {
    return new Promise((resolve, reject) => {
        db.query('insert into promotions (title, brand_id, store, number_of_percent_deal, rating, deal_url, image_url, start_sale_time, end_sale_time, sort_type, screen_type, province) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [promotion.title, promotion.brand_id, promotion.store, promotion.number_of_percent_deal, promotion.rating, promotion.deal_url, promotion.image_url, promotion.start_sale_time, promotion.end_sale_time, promotion.sort_type, promotion.screen_type, promotion.province], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const getPromotionByID = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM promotions where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}


module.exports = {
    getAllPromotionInDb,
    getPromotionInDb,
    getPromotionInfo,
    savePromotionToDb,
    getPromotionByID
}