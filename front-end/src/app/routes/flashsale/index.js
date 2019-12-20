import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import FlashsaleFilter from "./components/FlashsaleFilter";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import FlashsaleCard from "./components/FlashsaleCard";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {getAllFlashsale, hideFlashsaleLoader, showFlashsaleLoader} from 'actions/Flashsale';

class Flashsale extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filterFlashsales: [],
            isFiltering: false,
        };
    }

    handleGetNextFlashsales() {
        let {filterInfo, allFlashsales} = this.props;

        filterInfo.offset = allFlashsales.length;

        this.props.showFlashsaleLoader();
        this.props.getAllFlashsale(filterInfo);
    }

    handleSearchValueChange = event => {
        const newValue = event.target.value;

        this.setState({
            searchValue: newValue
        });

        this.handleFilterFlashsale(event, newValue);
    };

    handleFilterFlashsale = (event, value = this.state.searchValue) => {
        event.preventDefault();

        if (value !== '') {
            this.setState({
                filterFlashsales: this.props.allFlashsales.filter(flashsale => {
                    let productName = flashsale.product_name ? flashsale.product_name.toLowerCase() : "";

                    return (
                        productName.includes(value.toLowerCase())
                    )
                }),
                isFiltering: true
            })
        } else {
            this.setState({
                filterFlashsales: [],
                isFiltering: false
            })
        }
    };

    render() {
        const {flashsaleLoader, allFlashsales} = this.props;

        return (
            <div className="app-wrapper animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.flashsale"/>}/>

                <div className="row">
                    <div className="col-lg-3 col-md-4">
                        <div className="row flashsale-filter">
                            <div className="col-md-12">
                                <div className="card shadow border-0 bg-white p-2">
                                    <form className="m-0" role="search">
                                        <div className="search-bar">
                                            <div className="form-group">
                                                <input type="search" className="form-control form-control-lg border-0"
                                                       placeholder="Tìm kiếm tên sản phẩm đang giảm giá..."
                                                       onChange={this.handleSearchValueChange}/>
                                                <button className="search-icon" onClick={this.handleFilterFlashsale}>
                                                    <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <FlashsaleFilter/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <Card className="shadow border-0">
                            <CardBody>
                                <div className="row">
                                    {
                                        (this.state.isFiltering ? this.state.filterFlashsales : allFlashsales).map((flashsale, index) => (
                                            <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                                                <FlashsaleCard item={flashsale}/>
                                            </div>
                                        ))
                                    }
                                    {
                                        allFlashsales.length > 0 ?
                                            <div className="col-xl-3 col-lg-4 col-sm-6">
                                                <Tooltip id="tooltip-icon" title="Xem thêm" placement="bottom">
                                                    <Card className="shadow border-0 bg-transparent h-90">
                                                        <Button
                                                            className="w-100 d-block h-100 text-primary p-5"
                                                            onClick={() => {
                                                                this.handleGetNextFlashsales()
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
                                    flashsaleLoader &&
                                    <div className="loader-view mb-4">
                                        <CircularProgress/>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({auth, flashsale}) => {
    const {userInfo} = auth;
    const {flashsaleLoader, allFlashsales, filterInfo} = flashsale;
    return {userInfo, flashsaleLoader, allFlashsales, filterInfo}
};

export default connect(mapStateToProps, {
    getAllFlashsale,
    showFlashsaleLoader,
    hideFlashsaleLoader
})(Flashsale);
