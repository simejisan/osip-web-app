const express = require('express');
const router = express.Router();

const authMiddleware =  require('../controllers/authsController');
const rolesController = require('../controllers/rolesController');

router.post('/member/:id', authMiddleware, rolesController.setFunctionForMember)
router.post('/assign', authMiddleware, rolesController.assignForRoleId)
router.post('/unassign', authMiddleware, rolesController.unassignForRoleId)
router.get('/member', authMiddleware, rolesController.getAllFunctionOfMember)
router.get('/admin', authMiddleware, rolesController.getAllFunctionOfAdmin)
router.post('/admin/:id', authMiddleware, rolesController.setFunctionForAdmin)
router.get('/all', authMiddleware, rolesController.getAllRole)
router.post('/add', authMiddleware, rolesController.addRole)
router.put('/edit', authMiddleware, rolesController.editRole)
router.delete('/delete', authMiddleware, rolesController.deleteRole)

module.exports = router;
