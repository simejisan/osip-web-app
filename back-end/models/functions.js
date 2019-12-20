const db = require("../database/database");
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);

// Get Function
const getFunction = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from functions', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

// Get Function By ID
const getFunctionById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM functions where id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get Function By Name
const getFunctionByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM functions where name = $1', [name], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Create Function
const createFuction = (short, name, description, level, parent_id, status, on_menu, sort, icon, link) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO functions (short, name, description, level, parent_id, status, on_menu, sort, icon, link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [short, name, description, level, parent_id, status, on_menu, sort, icon, link], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Update Function
const updateFunction = (new_function, function_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE functions SET short = $1, name = $2, description = $3, level = $4, parent_id = $5, status = $6, on_menu = $7, sort = $8, icon = $9, link = $10 where id = $11', [new_function.short, new_function.name, new_function.description, new_function.level, new_function.parent_id, new_function.status, new_function.on_menu, new_function.sort, new_function.icon, new_function.link, function_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Delete Function
const deleteFunction = (function_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from functions where id = $1', [function_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    })
}

// Delete Function By Name
const deleteFunctionByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from functions where name = $1',[name], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    })
}

// Get function of user
function getFunctionOfUserByIdInDB(id) {
    let query = 'select distinct functions.* from users, roles, roles_func, functions where users.role_id = roles.id and roles.id = roles_func.role_id and roles_func.func_id = functions.id and users.id = $1'
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

async function getFunctionOfUser(id) {
    await redisClient.get("func_of_user_" + id, async (err, data) => {
        if (err) {
            console.log("Error Redis: ", err.message);
        } else {
            return new Promise(async (resolve, reject) => {
                if (data == null) {
                    try {
                        let funcs = await getFunctionOfUserByIdInDB(id)
                        await redisClient.set("func_of_user_" + id, JSON.stringify(funcs));
                        resolve(funcs);
                    } catch (err) {
                        console.log("Error get function of user: ", err);
                        reject(err);
                    }
                    
                } else {
                    resolve(JSON.parse(data))
                }
            })
        }
    })

}
module.exports = {
    getFunctionById,
    getFunctionByName,
    getFunction,
    createFuction,
    updateFunction,
    deleteFunction,
    deleteFunctionByName,
    getFunctionOfUserByIdInDB,
    getFunctionOfUser,
}