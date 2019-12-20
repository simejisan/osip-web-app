import React from 'react';
import {Card, CardBody, CardHeader, CardImg, CardSubtitle} from "reactstrap";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {openFrameDialog} from 'actions/Promotion';
import Tooltip from "@material-ui/core/Tooltip";
import {assignFavorite, unassignFavorite} from 'actions/Favorite';

class PromotionCard extends React.Component {

    isInFavorite(promotionId) {
        let index = this.props.allFavorites.findIndex(favorite => favorite.id === promotionId);

        return index >= 0;
    }

    toggleFavorite(promotionId) {
        let isAssign = !this.isInFavorite(promotionId);

        let body = {
            userId: this.props.userInfo.user.id,
            promotionId: promotionId
        };

        if (isAssign) this.props.assignFavorite(body);
        else this.props.unassignFavorite(body);
    }

    render() {
        const {item} = this.props;

        return (
            <Card className="shadow border-0 promotion-card">
                <div className="promotion-card--deal">
                    <div className="promotion-card--deal--text">
                        {`-${item.number_of_percent_deal}%`}
                    </div>
                </div>
                <CardHeader className="bg-white">
                    <img src={item.brand.image} alt={item.brand.name} height="30px" width="auto"/>
                </CardHeader>
                <div className="card-image-wrapper">
                    <CardImg top width="100%" src={item.image_url} alt={item.title}/>
                </div>
                <CardBody>
                    <Tooltip id="tooltip-icon" title={item.title} placement="bottom">
                        <div className="card-title font-weight-bold">{item.title}</div>
                    </Tooltip>
                    <Tooltip id="tooltip-icon" title={item.store} placement="bottom">
                        <CardSubtitle className="text-muted">{item.store}</CardSubtitle>
                    </Tooltip>
                    <Divider/>
                    <Tooltip id="tooltip-icon" title={this.isInFavorite(item.id) ? "Bỏ ưu thích" : "Thêm ưu thích"}
                             placement="bottom">
                        <Button className="jr-btn mt-3 text-danger" onClick={() => this.toggleFavorite(item.id)}>
                            <i className={`zmdi zmdi-${this.isInFavorite(item.id) ? "favorite" : "favorite-outline"} zmdi-hc-fw`}/>
                        </Button>
                    </Tooltip>
                    <Button className="jr-btn float-right mt-3" color="primary"
                            onClick={() => {
                                this.props.openFrameDialog(item.deal_url)
                            }}
                    >
                        <i className="zmdi zmdi-chevron-right zmdi-hc-fw"/>
                        <span>Chi tiết</span>
                    </Button>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = ({auth, promotion, favorite}) => {
    const {userInfo} = auth;
    const {isOpenLink} = promotion;
    const {allFavorites} = favorite;
    return {userInfo, isOpenLink, allFavorites}
};

export default connect(mapStateToProps, {
    openFrameDialog,
    assignFavorite,
    unassignFavorite
})(PromotionCard);
