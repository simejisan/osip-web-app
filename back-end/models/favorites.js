const db = require("../database/database");

// Create Favorite
const createFavorite = (user_id, promotion_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO favorites (user_id, promotion_id) VALUES ($1, $2)', [user_id, promotion_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get All Favorite
const getAllFavorites = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from favorites', (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const getFavoriteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM favorites where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const getFavoriteOfUser = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('select distinct promotions.* from promotions, favorites, users where users.id = favorites.user_id and promotions.id = favorites.promotion_id and users.id = $1', [user_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Find User And Promotion
const findAssignPromotion = (user_id, promotion_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from favorites WHERE user_id = $1 and promotion_id = $2', [user_id, promotion_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}


const deleteFavorite = (user_id, promotion_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM favorites WHERE user_id = $1 and promotion_id = $2', [user_id, promotion_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const updateFavorite = (user_id, promotion_id, id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE favorites SET user_id = $1, promotion_id = $2 where id = $3', [user_id, promotion_id, id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}


const deleteFavoriteByID = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM favorites where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}
module.exports = {
    createFavorite,
    getAllFavorites,
    getFavoriteById,
    getFavoriteOfUser,
    findAssignPromotion,
    deleteFavorite,
    updateFavorite,
    deleteFavoriteByID
}
