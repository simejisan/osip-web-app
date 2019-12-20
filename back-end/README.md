# OSIP Server

## Cài đặt thư viện và các dependency
```
npm install
```
## Chạy project
```
nodemon index.js
```
## Note:
- Nếu muốn chạy DB local của riêng mình thì khi chạy dự án hãy vào file `.env.sample` copy toàn bộ nội dung và paste vào file `.env` để chạy postgre trên local. Vào file database.js comment bỏ dòng `ssl: true` vì DB local nếu ko nhầm ko set đc ssl. Xong chạy scrip `nodemon index.js` là xong.
- Còn nếu muốn dùng luôn postgre DB trên server thì chẳng cần làm gì cả chứ chạy script `nodemon index.js` là được rồi.
## API các bên thứ 3:
- getSendoHotWords
url = "https://mapi.sendo.vn/mob/product/search/keyword/top"
Method = “GET”

- getShopeeHotWords
url = "https://mall.shopee.vn/backend/CMS/hotwords.json"

- getTikiHotWords
url = "https://api.tiki.vn/v2/search/suggestion/keyword/top"

- getGoogleHotWords
url = "https://trends.google.com/trends/hottrends/visualize/internal/data"

- getJamjaPromotion
url = 'https://jamja.vn/api/v4/searchdeal/?offset=0&limit=100&sort_type=newest&province=ha-noi'

- getIfindPromotion
url = `https://iws.ifind.vn/v2/mobile/deals/category/1000?areaId=1&pageIndex=${index}`

- getSendoPromotion
url = "https://mapi.sendo.vn/mob/mall/top-promotion"

- suggestLazada
URL =`https://sug.lazada.vn/sug?area=lazada_vn_web&code=utf-8&q=${keyword}`

- suggestShopee
URL =`https://shopee.vn/api/v2/search_hint/get?keyword=${keyword}&search_type=0`

- suggestTiki
URL =`https://tiki.vn/catalogsearch/suggestion`

- suggestSendo
URL =`https://www.sendo.vn/search/suggest/?platform=desktop2&q=${keyword}`