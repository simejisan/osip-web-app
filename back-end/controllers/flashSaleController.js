const axios = require('axios')

const { fail, success } = require('../utils/response-utils');

function _getFlashSaleFromBeeCost(source, offset, limit) {
    let url = `https://apiv2.beecost.com/ecom/flashsale/?limit=${limit}&page=${offset}&platform_id=${source}`
    return axios.get(url).then(async (res) => {
        return res.data.results
    }).catch((err) => {
        console.log("Error get promotion from jamja: ", err)
    })
}

async function getFlashSale(req, res) {
    let source = req.query.source
    let offset = req.query.offset
    let limit = req.query.limit

    if (source === "" || offset === "" || limit === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        try {
            let flash_sale = await _getFlashSaleFromBeeCost(source, offset, limit)
            Promise.all(flash_sale.map((sale) => {
                delete(sale.product_base_id)
                delete(sale.shop_base_id)
                delete(sale.categories)
                sale.url_images = sale.url_images[0]
                delete(sale.url_thumbnail)
                return sale
            })).then((r) => {
                res.json({
                    flash_sales: r
                })
                return
            }).catch((e) => {
                res.json(fail("Lỗi truy vấn danh sách flash sale", 500))
                return
            })
        } catch (e) {
            console.log("Error get flash sale: ", e)
            res.json(fail("Lỗi truy vấn danh sách flash sale", 500))
            return
        }
    }
}

module.exports = {
    getFlashSale
}
