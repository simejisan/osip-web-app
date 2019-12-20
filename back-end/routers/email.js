const express = require('express')
const router = express.Router();

const emailController = require("../controllers/emailController");

router.post('/send', emailController.sendEmail)
router.get('/check', emailController.checkEmail)


module.exports = router;

