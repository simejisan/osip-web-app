const { fail, success } = require('../utils/response-utils');
const Email = require('../utils/send-email-utils');
const cryptoRandomString = require('crypto-random-string');
const Users = require("../models/users")
const VerificationToken = require("../models/verification_token")
const cron = require('node-cron');

async function sendEmail(req, res) {

    const user = req.body;
    if (user.email === "" || user.email === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let userInfo = await Users.getUsersByEmail(user.email)
            if(userInfo.length > 0) {
                res.json(fail("Tài khoản đã đăng ký sử dụng hệ thống. Vui lòng đăng nhập để sử dụng hệ thống", 400))
                return
            } else {
                let verificationToken = cryptoRandomString({length: 10});
                await Email.sendVerificationCode(user.email, verificationToken);
                await VerificationToken.saveVerificationToDb(verificationToken)
                res.json(success("Gửi mã OTP tới địa chỉ email của bạn thành công"))
                return;
            }
        } catch (e) {
            console.log("Error: ", e.message)
            res.json(fail("Lỗi khi gửi mã xác nhận email", 500))
        }


    }
}

async function checkEmail(req, res){
    let verification_code = req.query.verification_code
    try {
        let verification = await VerificationToken.checkVerification(verification_code)
        if (verification.length > 0) {
            res.json(success("Xác thực mã OTP thành công"))
            return
        } else {
            res.json(fail("Mã xác thực không tồn tại", 400))
            return
        }
    } catch (e) {
        res.json(fail("Lỗi xác thực mã xác nhận", 500))
        return
    }
}

cron.schedule('*/10 * * * *', () => {
    console.log('Delete Verification Code in database');
    VerificationToken.deleteVerification();
});
module.exports = {
    sendEmail,
    checkEmail
}