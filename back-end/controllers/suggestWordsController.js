const axios = require('axios')
const { fail, success } = require('../utils/response-utils')


async function getSuggestWords(req, res) {
    let key_word = req.query.keyword
    let suggestWords = []
    if (key_word === "") {
        res.json(fail("Tham số truyền vào không hợp lệ", 400))
        return
    } else {
        // Encode keyword
        key_word = encodeURIComponent(key_word)

        let [lazadaWords, shopeeWords, tikiWords, sendoWords, chototWords, yes24Words] = await Promise.all([getSuggestLazada(key_word), getSuggestShopee(key_word), getSuggestTiki(key_word), getSuggestSendo(key_word), getSuggestChotot(key_word), getSuggestYes24(key_word)])

        if(lazadaWords != null) {
            if (lazadaWords.length > 0) {
                lazadaWords.map((word) => {
                    suggestWords.push({
                        keyword: word.model.query,
                        source: "lazada"
                    })
                })
            }
        }

        if(shopeeWords != null) {
            if (shopeeWords.length > 0) {
                shopeeWords.map((word) => {
                    suggestWords.push({
                        keyword: word.keyword,
                        source: "shopee"
                    })
                })
            }
        }

        if(tikiWords != null) {
            if (tikiWords.length > 0) {
                tikiWords.map((word) => {
                    suggestWords.push({
                        keyword: word.name,
                        source: "tiki"
                    })

                })
            }
        }

        if(sendoWords != null) {
            if (sendoWords.length > 0) {
                sendoWords.map((word) => {
                    suggestWords.push({
                        keyword: word.title,
                        source: "sendo"
                    })
                })
            }
        }

        if(chototWords != null) {
            if (chototWords.length > 0) {
                chototWords.map((word) => {
                    suggestWords.push({
                        keyword: word.formal,
                        source: "chotot"
                    })
                })
            }
        }

        if(yes24Words != null) {
            if (yes24Words.length > 0) {
                yes24Words.map((word) => {
                    suggestWords.push({
                        keyword: word,
                        source: "yes24"
                    })
                })
            }
        }
        suggestWords = shuffleArray(suggestWords)
        res.json({
            suggest_words: suggestWords
        })
        return
    }
}

// Shuffle Array
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function getSuggestLazada(keyword) {
    let url = `https://sug.lazada.vn/sug?area=lazada_vn_web&code=utf-8&q=${keyword}`
    return axios.get(url)
        .then((res) => {
            return res.data.result
        }).catch((err) => {
            console.log("Err: ", err)
        })
}

function getSuggestShopee(keyword) {
    let url = `https://shopee.vn/api/v2/search_hint/get?keyword=${keyword}&search_type=0`
    return axios.get(url)
        .then((res) => {
            return res.data.keywords
        }).catch((err) => {
            console.log("Error: ", err)
        })
}

function getSuggestTiki(keyword) {
    let url = `https://tiki.vn/api/v2/search/suggestion?q=${keyword}`
    return axios.get(url)
        .then((res) => {
            return res.data.keywords
        }).catch((err) => {
            console.log("Error: ", err)
        })
}

function getSuggestSendo(keyword) {
    let url = `https://www.sendo.vn/m/wap_v2/search/search-info?platform=web&q=${keyword}`
    return axios.get(url)
        .then((res) => {
            return res.data.result.data.sub_category
        }).catch((err) => {
            console.log("Error: ", err)
        })
}

function getSuggestChotot(keyword) {
    let url = `https://gateway.chotot.com/v1/public/search-suggestion/search?keywords=${keyword}`
    return axios.get(url)
        .then((res) => {
            return res.data.results
        }).catch((err) => {
            console.log("Error: ", err)
        })
}

function getSuggestYes24(keyword) {
    let url = `https://www.yes24.vn/Search/SearchResult?keyword=${keyword}`
    return axios.post(url)
        .then((res) => {
            return res.data.Result.KwList
        }).catch((err) => {
            console.log("Error: ", err)
        })
}
// getSuggestYes24(encodeURIComponent("a"))

module.exports = {
    getSuggestWords
}