const Functions = require("../models/functions");
const RoleFunc = require("../models/roles_func");
const { fail, success } = require('../utils/response-utils');

async function getFunctionOfUserById(req, res) {
    let func_id = req.params.id;

    let infoFunction = Functions.getFunctionById(func_id);

    infoFunction.then((data) => {
        if (data[0]) {
            res.json(data[0])
            return;
        } else {
            res.json({
                message: "Không tìm thấy thông tin cho chức năng",
                code: 404,
            })
            return;
        }
    }).catch((error) => {
        res.json({
            message: "Lỗi truy vấn thông tin chức năng",
            code: 500,
        })
        return;
    })
}

function createFunctionOfUser(req, res) {

    let reqFunction = req.body;

    let functionOfUser = Functions.createFuction(reqFunction.short, reqFunction.name, reqFunction.description, reqFunction.level, reqFunction.parent_id, reqFunction.status, reqFunction.on_menu, reqFunction.sort, reqFunction.icon, reqFunction.link)
    functionOfUser.then((data) => {
        res.json({
            message: "Tạo chức năng thành công",
            code: 200,
        });
        return;
    }).catch((error) => {
        console.log("Lỗi tạo chức năng người dùng", error);
        res.json({
            message: "Lỗi tạo chức năng người dùng",
            code: 500,
        });
        return;
    })
}

// Get All Function Of User
function getAllFunctionOfUser(req, res) {
    let functions = Functions.getFunction();

    functions.then((data) => {
        res.json({
            functions: data
        })
    }).catch((err) => {
        console.log("Lỗi truy vấn chức năng: ", err);
        res.json({
            message: "Lỗi truy vấn chức năng",
            code: 500
        })
        return;

    })

}

async function checkFunctionId(function_id) {
    try {
        let functionInfo = await Functions.getFunctionById(function_id)
        if (functionInfo.length == 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
    
}

// Update Function Of User By Id

async function updateFunctionOfUser(req, res) {
    let func_id = req.params.id;

    let new_function = req.body;
    let validId =  await checkFunctionId(func_id);
    if (validId) {
        let updateFunctionOfUser = Functions.updateFunction(new_function, func_id);

        updateFunctionOfUser.then((data) => {
            res.json({
                message: "Cập nhật thông tin chức năng thành công",
                code: 200,
            })
            return;
        }).catch((error) => {
            console.log("Lỗi cập nhật thông tin chức năng: ", error);
            res.json({
                message: "Lỗi cập nhật thông tin chức năng",
                code: 500,
            })
            return;
        })
    } else {
        res.json({
            message: "Tham số truyền vào không hợp lệ",
            code: 400,
        })
        return;
    }
}

async function deleteFunctionOfUser(req, res) {
    let func_id = req.params.id;

    try {
        await RoleFunc.deleteRoleFuncByFuncId(func_id);
        await Functions.deleteFunction(func_id);
        res.json(success("Xoá chức năng thành công"))
        return;
    } catch (error) {
        res.json(fail("Lỗi khi xoá chức năng", 500))
        return;
    }
}

module.exports = {
    createFunctionOfUser,
    getAllFunctionOfUser,
    updateFunctionOfUser,
    getFunctionOfUserById,
    deleteFunctionOfUser
}