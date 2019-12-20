const db = require("../database/database");

// Create User
const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get User By Id
const getUsersById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const deleteUsersByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users where email = $1', [email], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const deleteUsersById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}


// Find User By Email
const getUsersByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users where email = $1', [email], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Create User
const createUser = (name, email, password, role_id, avatar_url) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (name, email, password, role_id, avatar_url) VALUES ($1, $2, $3, $4, $5)', [name, email, password, role_id, avatar_url], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Update User
const updateUser = (name, email, role_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET name = $1, email = $2 where id = $3', [name, email, role_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const updateUserInfo = (new_user, user_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET name = $1, email = $2, role_id = $3, avatar_url = $4, status = $5 where id = $6', [new_user.name, new_user.email, new_user.role_id, new_user.avatar_url, new_user.status, user_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}


// Change user status
const changeAccountStatus = (status, user_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET status = $1 where id = $2', [status, user_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const resetPassword = (new_pass_word, user_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET password = $1 where id = $2', [new_pass_word, user_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}


// Assign role for user
const assignRole = (user_id, role_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET role_id = $1 where id = $2', [role_id, user_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get All User
const getAllUser = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from users', (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}
const deleteRoleOfUser = (role_id) => {
    return new Promise((resolve, reject) => {
        db.query('update users set role_id = null where role_id = $1', [role_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

module.exports = {
    getUsers,
    getUsersById,
    getUsersByEmail,
    createUser,
    updateUser,
    updateUserInfo,
    deleteUsersByEmail,
    deleteUsersById,
    changeAccountStatus,
    assignRole,
    getAllUser,
    resetPassword,
    deleteRoleOfUser
}
