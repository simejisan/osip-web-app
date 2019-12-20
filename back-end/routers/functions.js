const express = require('express')
const router = express.Router();

const function_controller = require("../controllers/functionsController");
const authMiddleware = require("../controllers/authsController");

// Router for function
router.post('/create', authMiddleware, function_controller.createFunctionOfUser);
router.get('/:id', authMiddleware, function_controller.getFunctionOfUserById);
router.get('/', authMiddleware, function_controller.getAllFunctionOfUser);
router.put('/update/:id', authMiddleware, function_controller.updateFunctionOfUser);
router.delete('/delete/:id', authMiddleware, function_controller.deleteFunctionOfUser);

module.exports = router;