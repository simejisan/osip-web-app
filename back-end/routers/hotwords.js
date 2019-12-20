const express = require('express');
const router = express.Router();
const authMiddleware = require("../controllers/authsController");
const HotWord = require("../controllers/hotWordsController");


router.get('/', authMiddleware, HotWord.getHotWord);

module.exports = router;
