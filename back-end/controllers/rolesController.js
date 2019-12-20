const RolesFunction = require('../models/roles_func');
const Roles = require('../models/roles');
const Functions = require('../models/functions');
const RoleFuncs = require('../models/roles_func');
const Users = require('../models/users');
const { fail, success } = require("../utils/response-utils");


function setFunctionForMember(req, res) {
    let func_id = req.params.id;

    let functionInfo = RolesFunction.createRoleFuncForMember(func_id);
    functionInfo.then((result) => {
        res.json(success("Cài đặt chức năng cho member thành công"));
        return;
    }).catch((error) => {
        res.json(fail("Lỗi cài đặt chức năng cho member", 500));
        return;
    })
}

function setFunctionForAdmin(req, res) {
    let func_id = req.params.id;

    let functionInfo = RolesFunction.createRoleFuncForAdmin(func_id);
    functionInfo.then((result) => {
        res.json(success("Cài đặt chức năng cho admin thành công"));
        return;
    }).catch((error) => {
        res.json(fail("Lỗi cài đặt chức năng cho admin", 500));
        return;
    })
}

function assignForRoleId(req, res) {
    let role_id = req.query.role_id;
    let func_id = req.query.func_id;

    if (role_id === "" || role_id === undefined || func_id === "" || func_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        // Check role_id
        let roleInfo = Roles.getRoleById(role_id)
        roleInfo.then((data) => {
            if (data.length == 0) {
                res.json(fail("Không tìm thấy thông tin role", 404));
                return;
            } else {
                // Check func_id
                funcInfo = Functions.getFunctionById(func_id)
                    .then((info) => {
                        if (info.length == 0) {
                            res.json(fail("Không tìm thấy thông tin chức năng", 404));
                            return;
                        } else {
                            // Check role_id and func_id
                            let assignInfo = RolesFunction.findAssignFunction(role_id, func_id);
                            assignInfo.then((result) => {
                                if (result.length > 0) {
                                    res.json(fail("Chức năng này đã được cài đặt cho role", 400));
                                    return;
                                } else {
                                    let assignResult = RolesFunction.assignFucntion(role_id, func_id);
                                    assignResult.then((result) => {
                                        res.json(success("Cài đặt chức năng thành công"));
                                        return;
                                    }).catch((error) => {
                                        res.json(fail("Lỗi cài đặt chức năng", 500));
                                        return;
                                    })
                                }
                            }).catch((error) => {
                                res.json(fail("Lỗi cài đặt chức năng", 500));
                                return;
                            })
                        }
                    })
                    .catch((error) => {
                        res.json(fail("Lỗi truy vấn thông tin chức năng", 500));
                        return;
                    })
            }
        }).catch((error) => {
            console.log("Error: ", error)
            res.json(fail("Lỗi truy vấn thông tin role", 500));
            return;
        })
    }
}

function unassignForRoleId(req, res) {
    let role_id = req.query.role_id;
    let func_id = req.query.func_id;

    if (role_id === "" || role_id == undefined || func_id === "" || func_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        // Check role_id
        let roleInfo = Roles.getRoleById(role_id)
        roleInfo.then((data) => {
            if (data.length == 0) {
                res.json(fail("Không tìm thấy thông tin role", 404));
                return;
            } else {
                // Check func_id
                funcInfo = Functions.getFunctionById(func_id)
                    .then((info) => {
                        if (info.length == 0) {
                            res.json(fail("Không tìm thấy thông tin chức năng", 404));
                            return;
                        } else {
                            // Check role_id and func_id
                            let assignInfo = RolesFunction.findAssignFunction(role_id, func_id);
                            assignInfo.then((result) => {
                                if (result.length > 0) {
                                    let unassignRoleId = RolesFunction.unAssignFunction(role_id, func_id);
                                    unassignRoleId.then(() => {res.json(success("Huỷ cài đặt chức năng thành công")); return;})
                                        .catch(() => {res.json(fail("Lỗi khi huỷ cài đặt chức năng", 500)); return;})
                                } else {
                                    res.json(fail("Chức năng này chưa được cài đặt cho role", 400));
                                    return;
                                }
                            }).catch((error) => {
                                res.json(fail("Lỗi huỷ cài đặt chức năng", 500));
                                return;
                            })
                        }
                    })
                    .catch((error) => {
                        res.json(fail("Lỗi truy vấn thông tin chức năng", 500));
                        return;
                    })
            }
        }).catch((error) => {
            console.log("Error: ", error)
            res.json(fail("Lỗi truy vấn thông tin role", 500));
            return;
        })
    }
}

function getAllFunctionOfMember(req, res) {
    let listFunction = RolesFunction.getAllFunctionOfMember();
    listFunction.then((result) => {
        res.json(result)
        return;
    }).catch((error) => {
        res.json(fail("Lỗi truy vấn danh sách chức năng cho member", 500));
        return;
    })
}

function getAllFunctionOfAdmin(req, res) {
    let listFunction = RolesFunction.getAllFunctionOfAdmin();
    listFunction.then((result) => {
        res.json(result)
        return;
    }).catch((error) => {
        res.json(fail("Lỗi truy vấn danh sách chức năng cho admin", 500));
        return;
    })
}

async function getAllRole(req, res) {
    try {
        let listRoles = await Roles.getAllRoles();

        await Promise.all(listRoles.map(async (role) => {
            let listFunc = await RolesFunction.getAllFunctionOfRoleId(role.id);
            role.funcs = listFunc;
        }))
        res.json({
            roles: listRoles
        })
        return;
    } catch (e) {
        res.json(fail("Lỗi truy vấn danh sách chức năng", 500));
        return;
    }
}

async function addRole(req, res) {
    let role = req.body;

    if (role.name === "" || role.label === "" || role.description === "" || role.is_changeable === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let checkRole = await Roles.checkRoleExist(role);

            if (checkRole.length == 0) {
                let newRole = await Roles.addNewRole(role);
                res.json(success("Tạo role mới thành công"));
                return;
            } else {
                res.json(fail("Đã tồn tại role", 403));
                return;
            }
        } catch (e) {
            res.json(fail("Lỗi tạo mới role", 500));
            return;
        }
    }
}

async function editRole(req, res) {
    let newRole = req.body;
    let role_id = req.query.id;

    if ((newRole.name === "" && newRole.label === "" && newRole.description === "" && newRole.is_changeable === "") || role_id === "" || role_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let roleInfo = await Roles.getRoleById(role_id);
            if (roleInfo.length > 0) {
                await Roles.editRole(newRole, role_id);
                res.json(success("Cập nhật role thành công"));
            } else {
                res.json(fail("Không tồn tại role", 404));
                return;
            }
        } catch (e) {
            res.json(fail("Lỗi chỉnh sửa role", 500));
            return;
        }
    }
}

async function deleteRole(req, res) {
    let role_id = req.query.id;
    if (role_id === "" || role_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let roleInfo = await Roles.getRoleById(role_id);
            if (roleInfo.length > 0) {
                await Users.deleteRoleOfUser(role_id)
                await RoleFuncs.deleteRoleFuncByRoleId(role_id)
                await Roles.deleteRole(role_id);
                res.json(success("Xoá role thành công"));
            } else {
                res.json(fail("Không tồn tại role", 404));
                return;
            }
        } catch (e) {
            res.json(fail("Lỗi xoá role", 500));
            return;
        }
    }
}
module.exports = {
    setFunctionForMember,
    setFunctionForAdmin,
    getAllFunctionOfMember,
    getAllFunctionOfAdmin,
    assignForRoleId,
    unassignForRoleId,
    getAllRole,
    addRole,
    editRole,
    deleteRole
}
