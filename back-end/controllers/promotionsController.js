const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const axios = require('axios');
const cron = require('node-cron');

const Promotions = require('../models/promotions');
const Brand = require('../models/brand');
const { fail, success } = require('../utils/response-utils');

function _getPromotionFromJamja(detail_tags, sort_type, screen_type, offset, limit, province) {
    let url = `https://jamja.vn/api/v4/searchdeal/?detail_tags=[${detail_tags}]&sort_type=${sort_type}&screen_type=${screen_type}&offset=${offset}&limit=${limit}&province=${province}`;
    return axios.get(url).then(async (res) => {
        return res.data.objects
    }).catch((err) => {
        console.log("Error get promotion from jamja: ", err)
    })
}

function _searchPromotionFromJamja(keyword, sort_type, offset, limit, province) {
    let url = `https://jamja.vn/api/v4/searchdeal/?detail_tags=[]&sort_type=${sort_type}&keyword=${keyword}&offset=${offset}&limit=${limit}&province=${province}`;
    return axios.get(url).then(async (res) => {
        return res.data.objects
    }).catch((err) => {
        console.log("Error get promotion from jamja: ", err)
    })
}

async function getPromotion(req, res) {
    // let detail_tags = req.query.detail_tags;
    let sort_type = req.query.sort_type;
    let screen_type = req.query.screen_type;
    let offset = req.query.offset;
    let limit = req.query.limit;
    let province = req.query.province;

    if (sort_type === "" || screen_type === "" || offset === "" || limit === "" || province === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let promotions = await Promotions.getPromotionInDb(sort_type, screen_type, province, offset, limit)
            if (promotions.length > 0) {
                console.log("Get promotion from DB")

                Promise.all(promotions.map(async (promotion) => {
                    let brandInfo = await Brand.getBrandInfoById(promotion.brand_id)
                    delete(promotion.brand_id)
                    promotion.brand = brandInfo[0]
                    return promotion
                })).then(r => {
                    res.json({
                        promotions: r
                    })
                    return
                }).catch((err) => {
                    res.json(fail("Không tìm thấy mã giảm giá", 404))
                    return
                })
            } else {
                res.json(fail("Không tìm thấy mã giảm giá", 404))
                return
            }
        } catch (e) {
            console.log("Error get list promotions: ", e)
            res.json(fail("Lỗi lấy danh sách mã giảm giá", 500))
            return
        }
    }
}

async function searchPromotion(req, res) {
    let key_word = req.query.key_word;
    let sort_type = req.query.sort_type;
    let offset = req.query.offset;
    let limit = req.query.limit;
    let province = req.query.province;
    try {
        let results = await _searchPromotionFromJamja(key_word, sort_type, offset, limit, province);
        await Promise.all(results.map((promotion) => {
            let resPromotion = {
                title: promotion.title,
                brand: {
                    name: promotion.brand.brand_name,
                    description: promotion.brand.brand_desc,
                    image: promotion.brand.image,
                },
                store: promotion.store,
                number_of_percent_deal: promotion.number_of_percent_deal,
                rating: promotion.rating,
                deal_url: promotion.deal_url,
                image_url: promotion.images[0].thumbnail,
                start_sale_time: promotion.start_sale_time,
                end_sale_time: promotion.end_sale_time,
                sort_type: sort_type,
                province: province,
            }
            return resPromotion
        })).then((r) => {
            res.json({
                promotions: r
            })
            return
        }).catch((err) => {
            console.log("Error search promotion: ", err)
            res.json(fail("Lỗi tìm kiếm mã giảm giá", 500))
            return
        })

    }catch (e) {
        console.log("Err: ", e)
        res.json(fail("Lỗi tra cứu thông tin khuyến mãi", 500))
        return
    }
}

function _savePromotionToDb(detail_tags, sort_type, screen_type, offset, limit, province) {
    let url = `https://jamja.vn/api/v4/searchdeal/?detail_tags=[${detail_tags}]&sort_type=${sort_type}&screen_type=${screen_type}&offset=${offset}&limit=${limit}&province=${province}`;
    return axios.get(url).then(async (res) => {
        await Promise.all(res.data.objects.map(async (promotion) => {
            let brand = {
                name: promotion.brand.brand_name,
                description: promotion.brand.brand_desc,
                image: promotion.brand.image
            }
            // Save brand to DB
            let brandInfo = await Brand.getBrandInfo(brand)
            if (brandInfo.length === 0) {
                await Brand.saveBrandToDb(brand)
            } else {
                let promo = {
                    title: promotion.title,
                    brand_id: brandInfo[0].id,
                    store: promotion.store,
                    number_of_percent_deal: promotion.number_of_percent_deal,
                    rating: promotion.rating,
                    deal_url: promotion.deal_url,
                    image_url: promotion.images[0].thumbnail,
                    start_sale_time: promotion.start_sale_time,
                    end_sale_time: promotion.end_sale_time,
                    sort_type: sort_type,
                    screen_type: screen_type,
                    province: province,
                }

                let promotionInfo = await Promotions.getPromotionInfo(promo)

                if (promotionInfo.length === 0) {
                    // Save promotion to DB
                    await Promotions.savePromotionToDb(promo)
                    return promo
                } else {
                    return promo
                }
            }
        })).then(r => {
            console.log("Save Promotion to Db successfully")
        })
    }).catch((err) => {
        console.log("Error get promotion from jamja: ", err)
    })
}

async function updatePromotion() {

    let sort_types = ["most_view", "newest", "discount_highest", "expires"]
    let provinces = ["ha-noi", "tp-hcm", "da-nang", "hai-phong"]
    // Update do an to Db
    provinces.map(async (province, index) => {
        console.log("Update eating to Db")
        await _savePromotionToDb("", sort_types[index], "an", 0, 50, province)
        // Update do uong to Dbdb
        console.log("Update drinking to Db")
        await _savePromotionToDb("", sort_types[index], "uong", 0, 50, province)
        // Update giai tri to Db
        console.log("Update entertainment to Db")
        await _savePromotionToDb("", sort_types[index], "giai-tri", 0, 50, province)
        // Update lam dep to Db
        console.log("Update spa to Db")
        await _savePromotionToDb("", sort_types[index], "lam-dep", 0, 50, province)
    })
    console.log("Cron job successfully")
}

// getPromotionFromJamja("", "newest", "an", 0, 24, "ha-noi");
// updatePromotion()
// Schedule cronjob to update promotion every 10 minute

// cron.schedule('*/60 * * * *', () => {
//     console.log('Updating Promotion to database');
//     updatePromotion();
// });

module.exports = {
    getPromotion,
    searchPromotion
}