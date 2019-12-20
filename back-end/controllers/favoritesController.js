const Favorites = require('../models/favorites');
const Users = require('../models/users');
const Promotion = require('../models/promotions');
const Brand = require('../models/brand');
const { fail, success } = require('../utils/response-utils');


async function getAllFavorites(req, res) {
    try {
        let favorites =  await Favorites.getAllFavorites();
        res.json({
            favorites: favorites
        })
        return;
    } catch (e) {
        res.json(fail("Lỗi truy vấn danh sách thông tin yêu thích", 500));
        return;
    }
}


function createNewFavoriteForUser(req, res) {
    let user_id = req.query.user_id;
    let promotion_id = req.query.promotion_id;

    if (user_id === "" || user_id === undefined || promotion_id === "" || promotion_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400));
        return;
    } else {
        // Check user id
        let userInfo = Users.getUsersById(user_id)
        userInfo.then((data) => {
            if (data.length === 0) {
                res.json(fail("Không tìm thấy thông tin người dùng", 404));
                return;
            } else {
                // Check promotion_id
                Promotion.getPromotionByID(promotion_id)
                    .then((info) => {
                        if (info.length === 0) {
                            res.json(fail("Không tìm thấy thông tin mã giảm giá", 404));
                            return;
                        } else {
                            // Check role_id and func_id
                            let favoriteInfo = Favorites.findAssignPromotion(user_id, promotion_id);
                            favoriteInfo.then((result) => {
                                if (result.length > 0) {
                                    res.json(fail("Người dùng đã chọn mã giảm giá này trước đây rồi", 400));
                                    return;
                                } else {
                                    let assignResult = Favorites.createFavorite(user_id, promotion_id);
                                    assignResult.then((result) => {
                                        res.json(success("Chọn mã giảm giá thành công"));
                                        return;
                                    }).catch((error) => {
                                        res.json(fail("Lỗi chọn mã giảm giá", 500));
                                        return;
                                    })
                                }
                            }).catch((error) => {
                                res.json(fail("Lỗi chọn mã giảm giá", 500));
                                return;
                            })
                        }
                    })
                    .catch((error) => {
                        res.json(fail("Lỗi truy vấn thông tin mã giảm giá", 500));
                        return;
                    })
            }
        }).catch((error) => {
            console.log("Error: ", error)
            res.json(fail("Lỗi truy vấn thông tin người dùng", 500));
            return;
        })
    }
}

async function getFavoriteByID(req, res) {
    let favorite_id = req.params.id;

    if (favorite_id === "") {
        res.json(fail("Hãy điền favorite_id", 400));
        return;
    } else {
        let favorite = Favorites.getFavoriteById(favorite_id);

        favorite.then((data) => {
            if (data[0]) {
                res.json(data[0])
                return;
            } else {
                res.json({
                    message: 'Lỗi truy vấn thông tin yêu thích',
                    code: 404,
                })
                return;
            }
        }).catch((error) => {
            res.json({
                message: "Lỗi truy vấn thông tin yêu thích",
                code: 500,
            })
            return;
        })
    }
}

async function getFavoritesOfUser(req, res) {
    let user_id = req.query.user_id;
    if (user_id === "" || user_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let user_info = await Users.getUsersById(user_id);
            delete(user_info[0].password)
            delete(user_info[0].created_time)
            delete(user_info[0].updated_time)
            let promotions = await Favorites.getFavoriteOfUser(user_id)
            Promise.all(promotions.map(async (promotion) => {
                console.log("Promotions: ", promotion)
                let brandInfo = await Brand.getBrandInfoById(promotion.brand_id)
                delete(promotion.brand_id)
                promotion.brand = brandInfo[0]
                return promotion
            })).then(r => {
                res.json({
                    user: user_info[0],
                    promotions: r
                })
                return
            }).catch((err) => {
                res.json(fail("Không tìm thấy mã giảm giá", 404))
                return
            })
        } catch(err) {
            console.log("Error get user info: ", err)
            res.json(fail("Lỗi truy vấn mã giảm giá yêu thích của người dùng", 500))
            return;
        }
    }
}

function deleteFavorite(req, res) {
    let user_id = req.query.user_id;
    let promotion_id = req.query.promotion_id;

    if (user_id === "" || user_id === undefined || promotion_id === "" || promotion_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
    } else {
        // Check user_id
        let userInfo = Users.getUsersById(user_id)
        userInfo.then((data) => {
            if (data.length === 0) {
                res.json(fail("Không tìm thấy thông tin người dùng", 404));
                return;
            } else {
                // Check func_id
                 Promotion.getPromotionByID(promotion_id)
                    .then((info) => {
                        if (info.length === 0) {
                            res.json(fail("Không tìm thấy thông tin mã giảm giá", 404));
                            return;
                        } else {
                            // Check user_id and promotion_id
                            let favoriteInfo = Favorites.findAssignPromotion(user_id, promotion_id);
                            favoriteInfo.then((result) => {
                                if (result.length > 0) {
                                    let deleteFavoriteId = Favorites.deleteFavorite(user_id, promotion_id);
                                    deleteFavoriteId.then(() => {res.json(success("Huỷ chọn mã giảm giá thành công")); return;})
                                        .catch(() => {res.json(fail("Lỗi khi huỷ chọn mã giảm giá", 500)); return;})
                                } else {
                                    res.json(fail("Người dùng chưa chọn mã giảm giá này", 404));
                                    return;
                                }
                            }).catch((error) => {
                                res.json(fail("Lỗi huỷ chọn mã giảm gía", 500));
                                return;
                            })
                        }
                    })
                    .catch((error) => {
                        res.json(fail("Lỗi truy vấn thông tin mã giảm giá", 500));
                        return;
                    })
            }
        }).catch((error) => {
            console.log("Error: ", error)
            res.json(fail("Lỗi truy vấn thông tin người dùng", 500));
            return;
        })
    }
}

async function checkFavoriteId(favorite_id) {
    try {
        let favoriteInfo = await Favorites.getFavoriteById(favorite_id)
        if (favoriteInfo.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

async function updateFavorite(req, res) {
    let favorite_id = req.query.favorite_id;
    let new_user_id = req.query.user_id;
    let new_promotion_id = req.query.promotion_id;

    if (favorite_id === "" || favorite_id === undefined || new_user_id === ""  || new_user_id === undefined|| new_promotion_id === "" || new_promotion_id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        let validId =  await checkFavoriteId(favorite_id);

        if (validId) {
            let updateFavorite = Favorites.updateFavorite(new_user_id, new_promotion_id, favorite_id);

            updateFavorite.then((data) => {

                res.json({
                    message: "Cập nhật thông tin yêu thích thành công",
                    code: 200,
                })
                console.log()
                return;
            }).catch((error) => {
                console.log("Lỗi cập nhật thông tin yêu thích: ", error);
                res.json({
                    message: "Lỗi cập nhật thông tin yêu thích",
                    code: 500,
                })
                return;
            })
        } else {
            res.json({
                message: "Tham số truyền vào không hợp lệ",
                code: 400,
            })
            return;
        }
    }
}

async function deleteFavoriteByID(req, res) {
    let id = req.params.id;
    if (id === "" || id === undefined) {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        let validID =  await checkFavoriteID(id);
        if(validID){
            try {
                await Favorites.deleteFavoriteByID(id);
                res.json(success("Xoá thông tin yêu thích thành công"))
                return;
            } catch (error) {
                res.json(fail("Lỗi khi xoá thông tin yêu thích", 500))
                return;
            }}
        else{
            res.json(fail("ID không hợp lệ", 500))
            return;
        }
    }
}

async function checkFavoriteID(id) {
    try {
        let favInfo = await Favorites.getFavoriteById(id)
        if (favInfo.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getAllFavorites,
    createNewFavoriteForUser,
    getFavoriteByID,
    getFavoritesOfUser,
    deleteFavorite,
    deleteFavoriteByID,
    updateFavorite
}
