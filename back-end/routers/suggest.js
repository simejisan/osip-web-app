const express = require('express')
const router = express.Router()
const authMiddleware = require('../controllers/authsController')
const suggestWordController = require('../controllers/suggestWordsController')

router.get('/', authMiddleware, suggestWordController.getSuggestWords)

module.exports = router