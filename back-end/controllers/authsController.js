const jwt_token = require('jsonwebtoken');
const user_md = require("../models/users");
const { success, fail } = require("../utils/response-utils");

module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'OSIP') {
        
        let token = req.headers.authorization.split(' ')[1];

        let secret = process.env.JWT_SECRET;

        jwt_token.verify(token, secret, function(err, payload) {
            if (err) {
                res.json(fail("Bạn không được phép truy cập", 401))
                return;
            } else {
                let id = payload.id;

                let userInfo = user_md.getUsersById(id);
                userInfo.then((data) => {
                    delete(data[0].password);
                    if (data) {
                        req.body.user = data[0];
                        next();
                    }
                }).catch((err) => {
                    
                    res.json(fail("Lỗi truy vấn thông tin người dùng", 500))
                    return;
                })
            }
        })
    } else {
        res.json(fail("Bạn không được phép truy cập", 401));
    }
} 