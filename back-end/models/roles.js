const db = require("../database/database");

// Get Role By ID
const getRoleById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get Role By Name
const getRoleByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles where name = $1', [name], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Create Role
const createRole = (name) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO roles (name) VALUES ($1)', [name], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Delete Role By Name
const deleteRoleByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM roles where name = $1', [name], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Delete Role For User
const deleteRoleForUser = (role_id) => {
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


const deleteRoleForUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('update users set role_id = null where email = $1', [email], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}
// Get All Roles
const getAllRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles', (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    }); 
}

// Add Role
const addNewRole = (role) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO roles (name, label, description, is_changeable) VALUES ($1, $2, $3, $4)', [role.name, role.label, role.description, role.is_changeable], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    }); 
}
const checkRoleExist = (role) => {
    return new Promise((resolve, reject) => {
        db.query('select * from roles where name = $1 and label = $2 and description = $3 and is_changeable = $4', [role.name, role.label, role.description, role.is_changeable], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const editRole = (role, role_id) => {
    return new Promise((resolve, reject) => {
        db.query('update roles set name =$1, label = $2, description = $3, is_changeable = $4 where id = $5', [role.name, role.label, role.description, role.is_changeable, role_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

const deleteRole = (role_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from roles where id = $1', [role_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Check get role id of user
const getRoleIdByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT role_id from users where id = $1', [user_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

module.exports = {
    getRoleById,
    getRoleByName,
    getRoleIdByUserId,
    createRole,
    getAllRoles,
    addNewRole,
    checkRoleExist,
    editRole,
    deleteRole,
    deleteRoleByName,
    deleteRoleForUser,
    deleteRoleForUserByEmail
}