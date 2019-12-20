import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import PromotionFilter from "./components/PromotionFilter";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import PromotionCard from "./components/PromotionCard";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {getAllPromotion, hidePromotionLoader, showPromotionLoader} from 'actions/Promotion';
import {getAllFavorite} from 'actions/Favorite';
import PromotionFrameDialog from "./components/PromotionFrameDialog";

class Promotion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterPromotions: [],
            isFiltering: false,
        };
    }

    componentDidMount() {
        this.handleGetAllFavorites()
    }

    handleGetAllFavorites() {
        if (this.props.allFavorites.length <= 0) {
            this.props.getAllFavorite(this.props.userInfo.user.id);
        }
    }

    handleGetNextPromotions() {
        let {filterInfo, allPromotions} = this.props;

        filterInfo.offset = allPromotions.length;

        this.props.showPromotionLoader();
        this.props.getAllPromotion(filterInfo);
    }

    handleSearchValueChange = event => {
        const newValue = event.target.value;

        this.setState({
            searchValue: newValue
        });

        this.handleFilterPromotion(event, newValue);
    };

    handleFilterPromotion = (event, value = this.state.searchValue) => {
        event.preventDefault();

        if (value !== '') {
            this.setState({
                filterPromotions: this.props.allPromotions.filter(promotion => {
                    let title = promotion.title ? promotion.title.toLowerCase() : "";
                    let store = promotion.store ? promotion.store.toLowerCase() : "";

                    return (
                        title.includes(value.toLowerCase()) ||
                        store.includes(value.toLowerCase())
                    )
                }),
                isFiltering: true
            })
        } else {
            this.setState({
                filterPromotions: [],
                isFiltering: false
            })
        }
    };

    render() {
        const {promotionLoader, allPromotions} = this.props;

        return (
            <div className="app-wrapper animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.promotion"/>}/>

                <div className="row">
                    <div className="col-lg-3 col-md-4">
                        <div className="row promotion-filter">
                            <div className="col-md-12">
                                <div className="card shadow border-0 bg-white p-2">
                                    <form className="m-0" role="search">
                                        <div className="search-bar">
                                            <div className="form-group">
                                                <input type="search" className="form-control form-control-lg border-0"
                                                       placeholder="Tìm kiếm tên hoặc cửa hàng khuyến mại..."
                                                       onChange={this.handleSearchValueChange}/>
                                                <button className="search-icon" onClick={this.handleFilterPromotion}>
                                                    <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <PromotionFilter/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <Card className="shadow border-0">
                            <CardBody>
                                <div className="row">
                                    {
                                        (this.state.isFiltering ? this.state.filterPromotions : allPromotions).map(promotion => (
                                            <div className="col-xl-3 col-lg-4 col-sm-6" key={promotion.id}>
                                                <PromotionCard item={promotion}/>
                                            </div>
                                        ))
                                    }
                                    {
                                        allPromotions.length > 0 ?
                                            <div className="col-xl-3 col-lg-4 col-sm-6">
                                                <Tooltip id="tooltip-icon" title="Xem thêm" placement="bottom">
                                                    <Card className="shadow border-0 bg-transparent h-90">
                                                        <Button
                                                            className="w-100 d-block h-100 text-primary p-5"
                                                            onClick={() => {
                                                                this.handleGetNextPromotions()
                                                            }}
                                                        >
                                                            <i className="zmdi zmdi-more zmdi-hc-4x my-0"/>
                                                            <div>Xem thêm</div>
                                                        </Button>
                                                    </Card>
                                                </Tooltip>
                                            </div> : <></>
                                    }
                                </div>

                                {
                                    promotionLoader &&
                                    <div className="loader-view mb-4">
                                        <CircularProgress/>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <PromotionFrameDialog/>
            </div>
        );
    }
}

const mapStateToProps = ({auth, promotion, favorite}) => {
    const {userInfo} = auth;
    const {promotionLoader, allPromotions, filterInfo} = promotion;
    const {allFavorites} = favorite;
    return {userInfo, promotionLoader, allPromotions, filterInfo, allFavorites}
};

export default connect(mapStateToProps, {
    getAllPromotion,
    showPromotionLoader,
    hidePromotionLoader,
    getAllFavorite
})(Promotion);
