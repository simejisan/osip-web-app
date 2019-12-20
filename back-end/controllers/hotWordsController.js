const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const axios = require('axios');
const HotWord = require('../models/hotWord');
const { fail, success } = require('../utils/response-utils');

const getHotWordsFromSendo = () => {
    var url = "https://mapi.sendo.vn/mob/product/search/keyword/top";
    return axios.get(url).then(function (response) {
        return response.data;
    }).catch(function (err) {
        console.log(err);
    })
}

const getHotWordsFromShopee = () => {
    var url = "https://shopee.vn/api/v2/recommendation/trending_searches_v2?limit=20&offset=0";
    return axios.get(url).then(function (response) {
        return response.data.data.items;
    }).catch(function (err) {
        console.log(err);
    })
};

const getHotWordsFromTiki = () => {
    var url = "https://api.tiki.vn/v2/search/suggestion/keyword/top";

    return axios.get(url).then(function (response) {
        return response.data.data;
    }).catch(function (err) {
        console.log(err);
    })
};

const getHotWordsFromGoogle = () => {
    var url = "https://trends.google.com/trends/hottrends/visualize/internal/data";
    return axios.get(url).then(function (response) {
        return response.data.vietnam;
    }).catch(function (err) {
        console.log(err)
    })
};

async function getHotWord(req, res) {
    await redisClient.get("hot_words", async (err, data) => {
        if (err) {
            console.log("Error Redis: ", err.message);
        } else {
            try {
                if (data == null) {
                    let listSendoHotWord = [];
                    let listShopeeHotWord = [];
                    let listTikiHotWord = [];
                    let listGoogleHotWord = [];
                    let getSendoHotWords = await HotWord.getHotWordFromSource("sendo");
                    if (getSendoHotWords.length === 0) {
                        let sendo = await getHotWordsFromSendo();
                        sendo.map(async (item) => {
                            tmpSendo = {
                                name: item.q,
                                count: item.total_count,
                                source: "sendo"
                            }
                            listSendoHotWord.push(tmpSendo)
                            // Save Hot Word to DB
                            await HotWord.saveHotWordToDB(tmpSendo);
                        })
                    } else {
                        listSendoHotWord = listSendoHotWord.concat(getSendoHotWords);
                    }
                    let getShopeeHotWords = await HotWord.getHotWordFromSource("shopee");
                    if (getShopeeHotWords.length === 0) {
                        let shopee = await getHotWordsFromShopee();
                        shopee.map(async (item, index) => {
                            tmpShopee = {
                                name: item.keyword,
                                count: item.resultcnt.toString(),
                                source: "shopee"
                            }
                            listShopeeHotWord.push(tmpShopee);
                            //Save Hot Word to DB
                            await HotWord.saveHotWordToDB(tmpShopee);
                        })
                    } else {
                        listShopeeHotWord = listShopeeHotWord.concat(getShopeeHotWords);
                    }
                    let getTikiHotWords = await HotWord.getHotWordFromSource("tiki");
                    if (getTikiHotWords.length === 0) {
                        let tiki = await getHotWordsFromTiki();
                        tiki.map(async (item) => {
                            tmpTiki = {
                                name: item.keyword,
                                count: item.total,
                                source: "tiki"
                            }
                            listTikiHotWord.push(tmpTiki);
                            //Save Hot Word to DB
                            await HotWord.saveHotWordToDB(tmpTiki);
                        })
                    } else {
                        listTikiHotWord = listTikiHotWord.concat(getTikiHotWords);
                    }
                    let getGoogleHotWords = await HotWord.getHotWordFromSource("google");
                    if (getGoogleHotWords.length === 0) {
                        let google = await getHotWordsFromGoogle();
                        google.map(async (item, index) => {
                            tmpGoogle = {
                                name: item,
                                count: Math.floor(index + 100000 + Math.random() * 900000),
                                source: "google"
                            }
                            listGoogleHotWord.push(tmpGoogle);
                            //Save Hot Word to DB
                            await HotWord.saveHotWordToDB(tmpGoogle);
                        })
                    } else {
                        listGoogleHotWord = listGoogleHotWord.concat(getGoogleHotWords);
                    }

                    let hotWords = {
                        sendo: listSendoHotWord,
                        shoppe: listShopeeHotWord,
                        tiki: listTikiHotWord,
                        google: listGoogleHotWord
                    }

                    // Save to Redis
                    await redisClient.set("hot_words", JSON.stringify(hotWords));
                    res.json({
                        hot_words: hotWords,
                    })
                    return;
                } else {
                    res.json({
                        hot_words: JSON.parse(data),
                    })
                    return;
                }
            } catch (err) {
                console.log("Error get hot word in DB: ", err)
                res.json(fail("Lỗi truy vấn hot words", 500));
                return;
            }
        }
    })
}

module.exports = {
    getHotWord
}
