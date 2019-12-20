const express = require('express')
const router = express.Router();

const user_controller = require("../controllers/usersController");
const authMiddleware = require("../controllers/authsController");

// Register 
router.post('/register', user_controller.register);
router.post('/login', user_controller.login);
router.post('/assign-role', user_controller.assignRoleForUser);

// Router function of user
router.get('/function', authMiddleware, user_controller.getFunctionOfUserByUserId);
router.post('/status', authMiddleware, user_controller.changeAccountStatus);
router.get('/all', authMiddleware, user_controller.getAllUser);
router.put('/update', authMiddleware, user_controller.updateUser);
router.delete('/delete', authMiddleware, user_controller.deleteUserByEmail);
router.post('/reset-password', authMiddleware, user_controller.resetPassword);

router.get('/', (req, res) => {
    res.json("Running router user");
})

module.exports = router;
