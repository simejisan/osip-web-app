const express = require('express');
const router = express.Router();
const authMiddleware = require("../controllers/authsController");
const Promotion = require("../controllers/promotionsController");
router.get('/', authMiddleware, Promotion.getPromotion);
router.get('/search', authMiddleware, Promotion.searchPromotion);

module.exports = router;