import React from 'react';
import {Card, CardBody, CardHeader, CardImg, CardSubtitle} from "reactstrap";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import __ from "helpers/globalHelpers";
import Tooltip from "@material-ui/core/Tooltip";

class FlashsaleCard extends React.Component {

    getQualityOfSale(sale) {

        if (sale.classify_price === 'best') return {
            text: 'Sale xịn',
            color: 'bg-success'
        };

        if (sale.classify_price === 'bad') return {
            text: 'Sale ảo',
            color: 'bg-danger'
        };

        return {
            text: 'Tạm được',
            color: 'bg-warning'
        }
    }

    render() {
        const {item} = this.props;
        const quality = this.getQualityOfSale(item);

        return (
            <Card className="shadow border-0 flashsale-card">
                <div className="flashsale-card--deal">
                    <div className="flashsale-card--deal--text">
                        {`-${Math.ceil(((item.price_before_discount - item.price) / item.price_before_discount) * 100)}%`}
                    </div>
                </div>
                <CardHeader className={quality.color}>
                    <h4 className="text-white font-weight-bold text-uppercase m-0">{quality.text}</h4>
                </CardHeader>
                <div className="card-image-wrapper">
                    <CardImg top width="100%" src={item.url_images} alt={item.product_name}/>
                </div>
                <CardBody>
                    <Tooltip id="tooltip-icon" title={item.product_name} placement="bottom">
                        <div className="card-title font-weight-bold">{item.product_name}</div>
                    </Tooltip>
                    <CardSubtitle className="text-muted">
                        <div className="d-flex">
                            <div className="mr-auto">
                                <h2 className="text-success m-0 mt-2 font-weight-semibold">{__.formatCurrency(item.price)}</h2>
                                <span
                                    className="text-muted text-strikethrough">{__.formatCurrency(item.price_before_discount)}</span>
                            </div>
                            <div className="ml-auto text-right">
                                <h5 className="text-muted m-0 mt-2 font-weight-semibold">Đã bán</h5>
                                <div className="text-primary d-flex align-items-end justify-content-end">
                                    <h2 className="m-0 font-weight-bold">{item.flash_sale_order_count}</h2>
                                    <h5 className="m-0">/{item.flash_sale_stock}</h5>
                                </div>
                            </div>
                        </div>
                    </CardSubtitle>
                    <Divider/>
                    {
                        (item.flash_sale_order_count === item.flash_sale_stock) ?
                            <h3 className="m-0 float-right my-3 text-danger font-weight-bold">Đã hết hàng</h3> :
                            <Button className="jr-btn float-right mt-3" color="primary"
                                    onClick={() => {
                                        window.open(item.url_direct, '_blank');
                                    }}
                            >
                                <i className="zmdi zmdi-chevron-right zmdi-hc-fw"/>
                                <span>Chi tiết</span>
                            </Button>
                    }
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = ({auth, flashsale}) => {
    const {userInfo} = auth;
    const {isOpenLink} = flashsale;
    return {userInfo, isOpenLink}
};

export default connect(mapStateToProps)(FlashsaleCard);
