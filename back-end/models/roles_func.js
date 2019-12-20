const db = require("../database/database");

// Get Role By ID
const getRoleFuncById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles_func where id = $1', [id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get All Funciton of member
const getAllFunctionOfMember = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles_func where role_id = 1414486229885391874', (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get All Funciton of admin
const getAllFunctionOfAdmin = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles_func where role_id = 1410453112988111873', (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Get All Function of Role Id
const getAllFunctionOfRoleId = (role_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT functions.* FROM functions, roles, roles_func where roles.id = roles_func.role_id and roles_func.func_id = functions.id and roles.id = $1', [role_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Create Function for member
const createRoleFuncForMember = (func_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO roles_func (role_id, func_id) VALUES (1414486229885391874, $1)', [func_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Create Function for admin
const createRoleFuncForAdmin = (func_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO roles_func (role_id, func_id) VALUES (1410453112988111873, $1)', [func_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Assign Function for Role_Id
const assignFucntion = (role_id, func_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO roles_func (role_id, func_id) VALUES ($1, $2)', [role_id, func_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Find Function and Role
const findAssignFunction = (role_id, func_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from roles_func WHERE role_id = $1 and func_id = $2', [role_id, func_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// UnAssign Function for Role_Id
const unAssignFunction = (role_id, func_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM roles_func WHERE role_id = $1 and func_id = $2', [role_id, func_id], (error, results) => {
            if (error) {
                console.log("Error: ", error);
                reject(error);
            }
            resolve(results.rows)
        })
    });
}

// Delete Function
const deleteRoleFuncByFuncId = (func_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from roles_func where func_id = $1',[func_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    })
}

// Delete Role
const deleteRoleFuncByRoleId = (role_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from roles_func where role_id = $1',[role_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows)
        })
    })
}

module.exports = {
    getRoleFuncById,
    createRoleFuncForMember,
    getAllFunctionOfMember,
    createRoleFuncForAdmin,
    getAllFunctionOfAdmin,
    deleteRoleFuncByFuncId,
    deleteRoleFuncByRoleId,
    assignFucntion,
    findAssignFunction,
    unAssignFunction,
    getAllFunctionOfRoleId
}
