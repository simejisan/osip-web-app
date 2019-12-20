const jwt_token = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const User = require('../models/users');
const Functions = require("../models/functions");
const Roles = require("../models/roles");
const hash_utils = require('../utils/hash-password-utils');
const { fail, success } = require('../utils/response-utils');

function register(req, res) {
    let user = req.body;

    if (user.email.trim().length == 0) {
        res.json(fail("Hãy điền địa chỉ email của bạn", 400));
        return;
    } else if (user.password != user.repassword && user.password.trim().length != 0) {
        res.json(fail("Mật khẩu của bạn không khớp", 400));
        return;
    } else {

        // Check User in DB
        let findUserInDB = User.getUsersByEmail(user.email);
        findUserInDB.then((data) => {

            if (data.length == 0) {
                //Insert User to DB

                user.password = hash_utils.hash_password(user.password);

                let result = User.createUser(user.name, user.email, user.password, "1414486229885391874", user.avatar_url)
                delete (user.password);
                delete (user.repassword);

                result.then((data) => {
                    res.json(success("Đăng ký thông tin thành công"));
                    return;
                }).catch((error) => {
                    console.log("Error register user: ", error);
                    res.json(fail("Lỗi tạo thông tin người dùng", 500));
                    return;
                })
            } else {
                res.json(fail("Email này đã được sử dụng", 400));
                return;
            }
        }).catch((error) => {
            console.log("Lỗi truy vấn thông tin người dùng: ", error);
            res.json(fail("Lỗi truy vấn thông tin người dùng", 500));
            return;
        })
    }
}

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let findUserInDB = User.getUsersByEmail(email);
    findUserInDB.then((data) => {
        if (data.length == 0) {
            res.json(fail("Địa chỉ Email này chưa được đăng ký", 400))
            return;
        } else {
            let user = data[0];

            if (user && hash_utils.compare_password(password, user.password)) {
                let payload = {
                    id: user.id
                }
                // This Token will be expired in 60 minute.
                let jwtToken = jwt_token.sign(payload, process.env.JWT_SECRET, { expiresIn: 1200000 * 30 });
                delete (user.created_time);
                delete (user.updated_time);
                delete (user.password);
                res.json({
                    user: user,
                    access_token: jwtToken
                })
                return;
            } else {
                res.json(fail("Mật khẩu của bạn không chính xác", 400));
                return;
            }
        }
    }).catch((err) => {
        console.log("Error: ", err);
        res.json(fail("Lỗi truy vấn thông tin người dùng", 500));
        return;
    })
}

async function getFunctionOfUserByUserId(req, res) {
    let user_id = req.body.user.id;
    try {
        let user_info = await User.getUsersById(user_id);
        delete(user_info[0].password)
        delete(user_info[0].created_time)
        delete(user_info[0].updated_time)
        let funcs = await Functions.getFunctionOfUserByIdInDB(user_id)
        res.json({
            user: user_info[0],
            functions: funcs
        })
        return;
    } catch(err) {
        console.log("Error get user info: ", err)
        res.json({
            message: "Lỗi truy vấn chức năng người dùng",
            code: 500,
        })
        return;
    }
}

async function changeAccountStatus(req, res) {
    let reqStatus = req.query.status;
    let reqUserId = req.query.user_id;

    if (reqStatus === "" || reqUserId === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        let user_id = req.body.user.id;
        let role_id = await Roles.getRoleIdByUserId(user_id);
        // Check Admin
        if (role_id[0].role_id === role_admin) {
            try {
                await User.changeAccountStatus(reqStatus, reqUserId);
                res.json(success("Thay đổi trạng thái người dùng thành công"));
            } catch (e) {
                res.json(fail("Lỗi chỉnh sửa trạng thái của người dùng", 500));
                return;
            }
        } else {
            res.json(fail("Bạn không có quyền chỉnh sửa trạng thái của người dùng", 403));
            return;
        }
    }
}

async function assignRoleForUser(req, res){
    let reqUserId = req.query.user_id;
    let reqRoleId = req.query.role_id;

    if (reqUserId === "" || reqRoleId === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            await User.assignRole(reqUserId, reqRoleId);
            res.json(success("Cài đặt vai cho cho người dùng thành công"));
            return;
        } catch (e) {
            res.json(fail("Lỗi cài đặt vai cho cho người dùng", 500));
            return;
        }
    }
}

async function getAllUser(req, res) {
    try {
        let users =  await User.getAllUser();
        res.json({
            users: users
        })
        return;
    } catch (e) {
        res.json(fail("Lỗi truy vấn danh sách người dùng", 500));
        return;
    }
}


async function _checkUserEmail(email) {
    try {
        let userInfo = await User.getUsersByEmail(email)
        if (userInfo.length == 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}


async function deleteUserByEmail(req, res) {
    let email = req.query.email;

    if (email === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let validEmail =  await _checkUserEmail(email);
            if(validEmail) {
                await User.deleteUsersByEmail(email);
                res.json(success("Xoá thông tin người dùng thành công"))
                return;
            }
            else{
                res.json(fail("Tham số truyền vào không hợp lệ", 400))
                return;
            }
        } catch (e) {
            console.log("Error Delete User: ", e)
            res.json(fail("Lỗi xoá người dùng hệ thống", 500))
        }
    }
}


async function _checkUserId(user_id) {
    try {
        let userInfo = await User.getUsersById(user_id)
        if (userInfo.length == 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

async function updateUser(req, res) {
    let user_id = req.query.id;

    if (user_id === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        let new_user = req.body;
        let validId =  await _checkUserId(user_id);
        if (validId) {
            let updateUser = User.updateUserInfo(new_user, user_id);

            updateUser.then((data) => {
                res.json(success("Cập nhật thông tin người dùng thành công"))
                return;
            }).catch((error) => {
                console.log("Lỗi cập nhật thông tin người dùng: ", error)
                res.json("Lỗi cập nhật thông tin người dùng", 500)
                return;
            })
        } else {
            res.json(fail("Tham số truyền vào không hợp lệ", 400))
            return;
        }
    }
}

async function resetPassword(req, res) {
    let new_pass_word = req.query.new_pass_word
    let user_id = req.query.user_id
    if (new_pass_word === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    }
    try {
        let userInfo = await User.getUsersById(user_id)

        if (userInfo.length > 0) {

            new_pass_word = hash_utils.hash_password(new_pass_word);

            await User.resetPassword(new_pass_word, user_id)
            res.json(success("Thay đổi mật khẩu thành công"))
            return
        } else {
            res.json(fail("Không tìm thấy thông tin người dùng", 404))
            return;
        }
    }catch (e) {
        console.log("Error: ", e)
        res.json(fail("Lỗi thay đổi mật khẩu", 500))
        return;
    }
}

module.exports = {
    register,
    login,
    getFunctionOfUserByUserId,
    changeAccountStatus,
    assignRoleForUser,
    getAllUser,
    deleteUserByEmail,
    updateUser,
    resetPassword
};
