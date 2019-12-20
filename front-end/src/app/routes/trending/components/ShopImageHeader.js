import React from "react";

function ShopImageHeader(props) {
    const {image, type, link} = props;
    return (
        <div className={`shop-image-header ${type}`}>
            <img src={image} alt="shop_header_image" title={type} className="shop-logo" width="80" height="80"/>
            <div className="shop-name">
                <div className="shop-name--title">{type}</div>
                <div className="shop-name--link">
                    <a href={`https://${link}`} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
            </div>
        </div>
    )
}

export default ShopImageHeader;

