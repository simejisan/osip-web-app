const express = require('express')
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");
const authMiddleware = require("../controllers/authsController");


router.get('/all', authMiddleware, favoritesController.getAllFavorites);
// router.get('/:id', authMiddleware, favoritesController.getFavoriteByID);
router.get('/', authMiddleware, favoritesController.getFavoritesOfUser);
router.post('/assign', authMiddleware, favoritesController.createNewFavoriteForUser)
router.post('/unassign', authMiddleware, favoritesController.deleteFavorite);
router.put('/update', authMiddleware, favoritesController.updateFavorite);
router.delete('/delete/:id', authMiddleware, favoritesController.deleteFavoriteByID);

module.exports = router;

