import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {PROMOTION_PROVINCES, PROMOTION_SCREEN_TYPE, PROMOTION_SORT_TYPES} from 'constants/utils/PromotionUtils'
import {Card, CardBody} from "reactstrap";
import {
    changeFilterInfo,
    clearPromotions,
    getAllPromotion,
    hidePromotionLoader,
    showPromotionLoader
} from 'actions/Promotion';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

class PromotionFilter extends React.Component {
    componentDidMount() {
        this.props.hidePromotionLoader();
        this.handleGetAllPromotions()
    }

    handleGetAllPromotions() {
        const {filterInfo} = this.props;

        this.props.clearPromotions();
        this.props.showPromotionLoader();
        this.props.getAllPromotion(filterInfo);
    }

    render() {
        const {filterInfo} = this.props;
        return (
            <Card className="shadow border-0">
                <CardBody className="pt-2">
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl className="w-100 mt-3 mb-2">
                                <InputLabel htmlFor="screenType">Danh mục</InputLabel>
                                <Select
                                    value={filterInfo.screenType}
                                    onChange={(event) => this.props.changeFilterInfo({
                                        ...filterInfo,
                                        screenType: event.target.value
                                    })}
                                    input={<Input id="screenType"/>}
                                >
                                    {
                                        PROMOTION_SCREEN_TYPE.map((type, index) => {
                                            return (
                                                <MenuItem key={index} value={type.value}>{type.text}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-12">
                            <FormControl className="w-100 mt-3 mb-2">
                                <InputLabel htmlFor="sortType">Sắp xếp</InputLabel>
                                <Select
                                    value={filterInfo.sortType}
                                    onChange={(event) => this.props.changeFilterInfo({
                                        ...filterInfo,
                                        sortType: event.target.value
                                    })}
                                    input={<Input id="sortType"/>}
                                >
                                    {
                                        PROMOTION_SORT_TYPES.map((type, index) => {
                                            return (
                                                <MenuItem key={index} value={type.value}>{type.text}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-12">
                            <FormControl className="w-100 mt-3 mb-2">
                                <InputLabel htmlFor="province">Thành phố</InputLabel>
                                <Select
                                    value={filterInfo.province}
                                    onChange={(event) => this.props.changeFilterInfo({
                                        ...filterInfo,
                                        province: event.target.value
                                    })}
                                    input={<Input id="province"/>}
                                >
                                    {
                                        PROMOTION_PROVINCES.map((type, index) => {
                                            return (
                                                <MenuItem key={index} value={type.value}>{type.text}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-12">
                            <Button variant="contained" color="primary"
                                    className="jr-btn text-uppercase text-white btn-block mt-3"
                                    onClick={() => {
                                        this.props.clearPromotions();
                                        this.handleGetAllPromotions()
                                    }}
                            >
                                <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                <span>Lọc khuyến mãi</span>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = ({promotion}) => {
    const {filterInfo} = promotion;
    return {filterInfo}
};

export default connect(mapStateToProps,
    {
        showPromotionLoader,
        hidePromotionLoader,
        getAllPromotion,
        clearPromotions,
        changeFilterInfo
    }
)(PromotionFilter);
