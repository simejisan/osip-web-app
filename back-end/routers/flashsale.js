const express = require('express');
const router = express.Router();

const authMiddleware = require("../controllers/authsController");
const FlashSale = require("../controllers/flashSaleController");

router.get('/', authMiddleware, FlashSale.getFlashSale);

module.exports = router;