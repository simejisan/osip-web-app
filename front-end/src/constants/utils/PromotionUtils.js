export const PROMOTION_MODEL = {
    id: "",
    title: "",
    brand: {},
    store: "",
    number_of_percent_deal: 0,
    rating: 0,
    deal_url: "",
    image_url: "",
    start_sale_time: "",
    end_sale_time: "",
    sort_type: "",
    screen_type: "",
    province: ""
};

export const PROMOTION_SORT_TYPES = [
    { text: "Xem nhiều nhất", value: "most_view" },
    { text: "Mới nhất", value: "newest" },
    { text: "Giảm giá sâu", value: "discount_highest" },
    { text: "Sắp hết hạn", value: "expires" }
];

export const PROMOTION_SCREEN_TYPE = [
    { text: "Đồ ăn", value: "an" },
    { text: "Đồ uống", value: "uong" },
    { text: "Giải trí", value: "giai-tri" },
    { text: "Làm đẹp", value: "lam-dep" }
];

export const PROMOTION_PROVINCES = [
    { text: "Hà Nội", value: "ha-noi" },
    { text: "TP Hồ Chí Minh", value: "tp-hcm" },
    { text: "Đà Nẵng", value: "da-nang" },
    { text: "Hải Phòng", value: "hai-phong" }
];

export const PROMOTION_FILTER_INFO = {
    province: 'ha-noi',
    sortType: 'newest',
    screenType: 'an',
    offset: 0,
    limit: 30
};
